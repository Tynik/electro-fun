import React from 'react';
import { Db, Item } from '../types';

export const useDbSearch = (db: Db, loadNextDbPart: () => boolean) => {
  const [id, setId] = React.useState<string>(null);
  const [keywords, setKeywords] = React.useState<string[]>(null);
  const [categoryId, setCategoryId] = React.useState<number>(null);
  const [foundItems, setFoundItems] = React.useState<Item[]>(null);
  const [searchOffset, setSearchOffset] = React.useState<number>(0);

  // React.useEffect(() => {
  //   setSearchOffset(0);
  // }, [id, text, categoryId]);

  React.useEffect(() => {
    if ((
      id === null && keywords === null && categoryId === null
    ) || !db) {
      return;
    }
    if (id === null && (keywords && !keywords.length) && categoryId === null) {
      setFoundItems(null);
      return;
    }
    const foundItems = db.items.filter(item => {
      let matched = true;

      if (id) {
        return item.id === id;
      }
      if (keywords.length) {
        matched &&= keywords.every(keyword => {
          let keywordMatch = item.title.toLowerCase().includes(keyword) ||
            item.subtitle.toLowerCase().includes(keyword);

          if (item.content) {
            keywordMatch ||= item.content.toLowerCase().includes(keyword);
          }

          if (item.seo) {
            keywordMatch ||= item.seo.description.toLowerCase().includes(keyword) ||
              item.seo.keywords.split(',').some(seoKeyword => {
                return seoKeyword.trim().toLowerCase().includes(keyword);
              });
          }

          if (item.externalLinks) {
            keywordMatch ||= item.externalLinks.some(externalLink =>
              externalLink.name.toLowerCase().includes(keyword)
            )
          }
          return keywordMatch;
        });
      }
      if (categoryId) {
        matched &&= item.categoryId === categoryId;
      }
      return matched;
    });
    // setFoundItems(prevFoundItems => [
    //   ...(
    //     prevFoundItems || []
    //   ),
    //   ...foundItems
    // ]);

    if (id && foundItems.length) {
      setFoundItems(foundItems);
      // if an item by id was found we should not load next db part
      return;
    }
    // setSearchOffset(db.items.length - 1);
    if (!loadNextDbPart()) {
      // finish
      setFoundItems(foundItems);
    }
  }, [db, id, keywords, categoryId]);

  const search = React.useCallback(({ id, text, categoryId }: {
    id?: string,
    text?: string,
    categoryId?: number
  }) => {
    if (id !== undefined) {
      setId(id);
      return;
    }
    if (text !== undefined) {
      setKeywords(text.toLowerCase().split(' ').filter(keyword => keyword));
    }
    if (categoryId !== undefined) {
      setCategoryId(categoryId);
    }
  }, []);

  return {
    search,
    foundItems
  };
};
