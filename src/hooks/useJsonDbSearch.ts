import React from 'react';
import debounce from 'lodash.debounce';

import {
  DbT,
  ItemIdT,
  ItemT,
  DatasheetIdT,
  FoundDatasheetsT
} from '../types';
import {
  matchItemWithSearch,
  matchDatasheetWithSearchKeywords
} from '../helpers';

export type SearchHandler = {
  id?: string
  text?: string
  categoryId?: number
  debounce?: boolean
}

export const useJsonDbSearch = (db: DbT, loadNextDbPart: () => boolean) => {
  const [itemId, setItemId] = React.useState<ItemIdT>(null);
  const [searchKeywords, setSearchKeywords] = React.useState<string[]>(null);
  const [categoryId, setCategoryId] = React.useState<number>(null);
  const [foundItems, setFoundItems] = React.useState<ItemT[]>(null);
  const [foundDatasheets, setFoundDatasheets] = React.useState<FoundDatasheetsT>(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchOffset, setSearchOffset] = React.useState<number>(0);

  // React.useEffect(() => {
  //   setSearchOffset(0);
  // }, [id, text, categoryId]);

  React.useEffect(() => {
    if ((
      itemId === null && searchKeywords === null && categoryId === null
    ) || !db) {
      return;
    }
    if (itemId === null && (
      searchKeywords && !searchKeywords.length
    ) && categoryId === null) {
      setIsSearching(false);
      setFoundItems(null);
      setFoundDatasheets(null);
      return;
    }
    let foundItems: ItemT[];

    if (itemId) {
      const foundItemById = db.items.find(item => item.id === itemId);
      foundItems = foundItemById ? [foundItemById] : [];

    } else {
      let foundItemsDatasheets: Record<DatasheetIdT, boolean> = {};
      let foundItemsRelatedDatasheets: Record<DatasheetIdT, boolean> = {};

      foundItems = db.items.filter(item => {
        const itemIsMatched = matchItemWithSearch(
          item, { searchKeywords, categoryId }
        );
        if (itemIsMatched) {
          if (item.datasheetId) {
            foundItemsDatasheets[item.datasheetId] = true;
          }
          if (item.relatedDatasheetIds) {
            item.relatedDatasheetIds.forEach(relatedDatasheetId => {
              foundItemsRelatedDatasheets[relatedDatasheetId] = true;
            });
          }
        }
        return itemIsMatched;
      });

      if (searchKeywords && searchKeywords.length) {
        const foundDatasheets = Object.keys(db.datasheets).reduce(
          (foundDatasheets, datasheetId) => {
            const datasheetIsMatched = foundItemsDatasheets[datasheetId]
              || foundItemsRelatedDatasheets[datasheetId]
              || matchDatasheetWithSearchKeywords(datasheetId, searchKeywords);

            if (datasheetIsMatched) {
              foundDatasheets[datasheetId] = { ...db.datasheets[datasheetId] };
              // assign priorities for datasheets to sort them after
              if (foundItemsDatasheets[datasheetId]) {
                foundDatasheets[datasheetId].priority = 0;
              }
              if (foundItemsRelatedDatasheets[datasheetId]) {
                foundDatasheets[datasheetId].priority = 1;
              }
            }
            return foundDatasheets;
          }, {} as FoundDatasheetsT
        );

        setFoundDatasheets(foundDatasheets);
      }
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
  }, [db, itemId, searchKeywords, categoryId]);

  const baseSearch = React.useCallback(
    ({ id, text, categoryId }: Omit<SearchHandler, 'debounce'>) => {
      if (id !== undefined) {
        setItemId(id);
        return;
      }
      if (text !== undefined) {
        const searchKeywords = text.toLowerCase()
          .split(' ')
          .filter(keyword => keyword);

        setSearchKeywords(searchKeywords);
      }
      if (categoryId !== undefined) {
        setCategoryId(categoryId);
      }
    }, []
  );

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
