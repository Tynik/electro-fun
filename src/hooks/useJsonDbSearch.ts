import React from 'react';
import debounce from 'lodash.debounce';

import { DbT, ItemT, DatasheetsT } from '../types';
import { matchItemKeyword } from '../utils';

export type SearchHandler = {
  id?: string
  text?: string
  categoryId?: number
  debounce?: boolean
}

export const useJsonDbSearch = (db: DbT, loadNextDbPart: () => boolean) => {
  const [itemId, setItemId] = React.useState<string>(null);
  const [keywords, setKeywords] = React.useState<string[]>(null);
  const [categoryId, setCategoryId] = React.useState<number>(null);
  const [foundItems, setFoundItems] = React.useState<ItemT[]>(null);
  const [foundDatasheets, setFoundDatasheets] = React.useState<DatasheetsT>(null);
  const [isSearching, setIsSearching] = React.useState(false);
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
    if (itemId === null && (
      keywords && !keywords.length
    ) && categoryId === null) {
      setIsSearching(false);
      setFoundItems(null);
      setFoundDatasheets(null);
      return;
    }
    let foundItems;
    let foundItemsDatasheets = {};
    let foundItemsRelatedDatasheets = {};

    if (itemId) {
      foundItems = db.items.find(item => item.id === itemId);
      foundItems = foundItems ? [foundItems] : [];

    } else {
      foundItems = db.items.filter(item => {
        let matched = true;

        if (keywords && keywords.length) {
          matched &&= keywords.every(keyword => matchItemKeyword(item, keyword));
        }
        if (categoryId) {
          matched &&= item.categoryId === categoryId;
        }
        if (matched) {
          if (item.datasheetId) {
            foundItemsDatasheets[item.datasheetId] = true;
          }
          if (item.relatedDatasheetIds) {
            item.relatedDatasheetIds.forEach(relatedDatasheetId => {
              foundItemsRelatedDatasheets[relatedDatasheetId] = true;
            });
          }
        }
        return matched;
      });
    }

    if (keywords && keywords.length) {
      const foundDatasheets = Object.keys(db.datasheets).reduce((foundDatasheets, datasheetId) => {
        const matched = foundItemsDatasheets[datasheetId]
          || foundItemsRelatedDatasheets[datasheetId]
          || keywords.every(keyword =>
            datasheetId.toLowerCase().includes(keyword)
          );
        if (matched) {
          foundDatasheets[datasheetId] = { ...db.datasheets[datasheetId] };
          if (foundItemsDatasheets[datasheetId]) {
            foundDatasheets[datasheetId].priority = 0;
          }
          if (foundItemsRelatedDatasheets[datasheetId]) {
            foundDatasheets[datasheetId].priority = 1;
          }
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
      setIsSearching(false);
      setFoundItems(foundItems);
    }
  }, [db, itemId, keywords, categoryId]);

  const baseSearch = React.useCallback(({ id, text, categoryId }: Omit<SearchHandler, 'debounce'>) => {
    if (id !== undefined) {
      setItemId(id);
      return;
    }
    if (text !== undefined) {
      const parsedKeywords = text.toLowerCase().split(' ').filter(keyword => keyword);
      setKeywords(parsedKeywords);
    }
    if (categoryId !== undefined) {
      setCategoryId(categoryId);
    }
  }, []);

  const debouncedSearch = React.useMemo(
    () =>
      debounce(baseSearch, 750),
    []
  );

  const search = React.useCallback(({ id, text, categoryId, debounce }: SearchHandler) => {
    if (id) {
      if (debounce) {
        throw new Error('Cannot be used id + debounce attribute together');
      }
      baseSearch({ id });
      return;
    }
    setIsSearching(true);

    if (debounce) {
      debouncedSearch({ text, categoryId });
    } else {
      baseSearch({ text, categoryId });
    }
  }, []);

  return {
    isSearching,
    search,
    foundItems,
    foundDatasheets
  };
};
