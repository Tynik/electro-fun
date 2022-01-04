import React from 'react';
import debounce from 'lodash.debounce';

import {
  DbT,
  ItemIdT,
  ItemT,
  DatasheetIdT,
  FoundDatasheetsT,
  ApplicationIdT
} from '~/types';
import {
  matchItemWithSearch,
  matchDatasheetWithSearchKeywords
} from '~/helpers';

export type SearchHandler = {
  ids?: string[]
  text?: string
  categoryId?: number
  debounce?: boolean
}

export const useJsonDbSearch = (db: DbT, loadNextDbPart: () => boolean) => {
  const [itemIds, setItemIds] = React.useState<ItemIdT[]>(null);
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
      itemIds === null && searchKeywords === null && categoryId === null
    ) || !db) {
      return;
    }
    if (itemIds === null && (
      searchKeywords && !searchKeywords.length
    ) && categoryId === null) {
      setItemIds(null);
      setIsSearching(false);
      setFoundItems(null);
      setFoundDatasheets(null);
      return;
    }
    let foundItems: ItemT[];

    if (itemIds) {
      foundItems = db.items.filter(item => itemIds.includes(item.id));

    } else {
      let foundItemsDatasheets: Record<DatasheetIdT, boolean> = {};
      let foundItemsRelatedDatasheets: Record<DatasheetIdT, boolean> = {};

      let matchedApplicationIds: ApplicationIdT[];

      if (searchKeywords && searchKeywords.length) {
        matchedApplicationIds = Object.keys(db.applications).filter(applicationId =>
          searchKeywords.some(searchKeyword =>
            db.applications[applicationId].toLowerCase().includes(searchKeyword)
          )
        );
      }

      foundItems = db.items.filter(item => {
        const itemIsMatched = matchItemWithSearch(
          item,
          {
            applicationIds: matchedApplicationIds,
            searchKeywords,
            categoryId
          }
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
        const foundDatasheets = Object.keys(db.datasheets).reduce<FoundDatasheetsT>(
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
          }, {}
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

    if (itemIds && foundItems.length === itemIds.length) {
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
  }, [db, itemIds, searchKeywords, categoryId]);

  const baseSearch = React.useCallback(
    ({ ids, text, categoryId }: Omit<SearchHandler, 'debounce'>) => {
      if (ids !== undefined) {
        setItemIds(ids);
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

  const search = React.useCallback(({ ids, text, categoryId, debounce }: SearchHandler) => {
    if (ids) {
      if (debounce) {
        throw new Error('Cannot be used ids + debounce attribute together');
      }
      baseSearch({ ids });
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
