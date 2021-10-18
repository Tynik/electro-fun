import React from 'react';

import { DbT, ItemT, DatasheetsT } from '../types';
import { matchItemKeyword } from '../utils';

export type SearchHandler = {
  id?: string
  text?: string
  categoryId?: number
}

export const useDbSearch = (db: DbT, loadNextDbPart: () => boolean) => {
  const [itemId, setItemId] = React.useState<string>(null);
  const [keywords, setKeywords] = React.useState<string[]>(null);
  const [categoryId, setCategoryId] = React.useState<number>(null);
  const [foundItems, setFoundItems] = React.useState<ItemT[]>(null);
  const [foundDatasheets, setFoundDatasheets] = React.useState<DatasheetsT>(null);
  const [searchOffset, setSearchOffset] = React.useState<number>(0);

  // React.useEffect(() => {
  //   setSearchOffset(0);
  // }, [id, text, categoryId]);

  React.useEffect(() => {
    if ((
      itemId === null && keywords === null && categoryId === null
    ) || !db) {
      return;
    }
    if (itemId === null && (keywords && !keywords.length) && categoryId === null) {
      setFoundItems(null);
      setFoundDatasheets(null);
      return;
    }
    const foundItems = db.items.filter(item => {
      let matched = true;

      if (itemId) {
        return item.id === itemId;
      }
      if (keywords && keywords.length) {
        matched &&= keywords.every(keyword => matchItemKeyword(item, keyword));
      }
      if (categoryId) {
        matched &&= item.categoryId === categoryId;
      }
      return matched;
    });

    if (keywords && keywords.length) {
      const foundDatasheets = Object.keys(db.datasheets).reduce((foundDatasheets, datasheetId) => {
        const matched = keywords.every(keyword =>
          datasheetId.toLowerCase().includes(keyword)
        );
        if (matched) {
          foundDatasheets[datasheetId] = db.datasheets[datasheetId];
        }
        return foundDatasheets;
      }, {});

      setFoundDatasheets(foundDatasheets);
    }

    // setFoundItems(prevFoundItems => [
    //   ...(
    //     prevFoundItems || []
    //   ),
    //   ...foundItems
    // ]);

    if (itemId && foundItems.length) {
      setFoundItems(foundItems);
      // if an item by id was found we should not load next db part
      return;
    }
    // setSearchOffset(db.items.length - 1);
    if (!loadNextDbPart()) {
      // finish
      setFoundItems(foundItems);
    }
  }, [db, itemId, keywords, categoryId]);

  const search = React.useCallback(({ id, text, categoryId }: SearchHandler) => {
    if (id !== undefined) {
      setItemId(id);
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
    foundItems,
    foundDatasheets
  };
};
