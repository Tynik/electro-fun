import React from 'react';
import debounce from 'lodash.debounce';

import type {
  Db,
  ProductId,
  Product,
  DatasheetId,
  FoundDatasheets,
  ApplicationId,
  ManufacturerId,
} from '~/types';
import {
  checkSearchKeyword,
  matchProductWithSearch,
  matchDatasheetWithSearchKeywords,
} from '~/helpers';

export type SearchHandler = {
  ids?: string[];
  text?: string;
  categoryId?: number;
  debounce?: boolean;
};

export const useJsonDbSearch = (db: Db, loadNextDbPart: () => boolean) => {
  const [productIds, setProductIds] = React.useState<ProductId[]>(null);
  const [searchKeywords, setSearchKeywords] = React.useState<string[]>(null);
  const [categoryId, setCategoryId] = React.useState<number>(null);
  const [foundProducts, setFoundProducts] = React.useState<Product[]>(null);
  const [foundDatasheets, setFoundDatasheets] = React.useState<FoundDatasheets>(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchOffset, setSearchOffset] = React.useState<number>(0);

  // React.useEffect(() => {
  //   setSearchOffset(0);
  // }, [id, text, categoryId]);

  React.useEffect(() => {
    if ((productIds === null && searchKeywords === null && categoryId === null) || !db) {
      return;
    }

    if (productIds === null && searchKeywords && !searchKeywords.length && categoryId === null) {
      setProductIds(null);
      setIsSearching(false);
      setFoundProducts(null);
      setFoundDatasheets(null);
      return;
    }

    let foundProducts: Product[];

    if (productIds) {
      foundProducts = db.items.filter(product => productIds.includes(product.id));
    } else {
      let foundProductsDatasheets: Record<DatasheetId, boolean> = {};
      let foundProductsRelatedDatasheets: Record<DatasheetId, boolean> = {};

      let matchedApplicationIds: ApplicationId[];

      if (searchKeywords && searchKeywords.length) {
        matchedApplicationIds = Object.keys(db.applications).filter(applicationId =>
          searchKeywords.every(searchKeyword =>
            checkSearchKeyword(db.applications[applicationId], searchKeyword),
          ),
        );
      }

      let matchedManufacturerIds: ManufacturerId[];

      if (searchKeywords && searchKeywords.length) {
        matchedManufacturerIds = Object.keys(db.manufacturers).filter(manufacturerId =>
          searchKeywords.every(searchKeyword =>
            checkSearchKeyword(db.manufacturers[manufacturerId].name, searchKeyword),
          ),
        );
      }

      foundProducts = db.items.filter(product => {
        const isProductMatched = matchProductWithSearch(product, {
          applicationIds: matchedApplicationIds,
          manufacturerIds: matchedManufacturerIds,
          searchKeywords,
          categoryId,
        });

        if (isProductMatched) {
          if (product.datasheetId) {
            foundProductsDatasheets[product.datasheetId] = true;
          }

          if (product.relatedDatasheetIds) {
            product.relatedDatasheetIds.forEach(relatedDatasheetId => {
              foundProductsRelatedDatasheets[relatedDatasheetId] = true;
            });
          }
        }

        return isProductMatched;
      });

      if (searchKeywords && searchKeywords.length) {
        const foundDatasheets = Object.keys(db.datasheets).reduce<FoundDatasheets>(
          (foundDatasheets, datasheetId) => {
            const datasheetIsMatched =
              foundProductsDatasheets[datasheetId] ||
              foundProductsRelatedDatasheets[datasheetId] ||
              matchDatasheetWithSearchKeywords(datasheetId, searchKeywords);

            if (datasheetIsMatched) {
              foundDatasheets[datasheetId] = { ...db.datasheets[datasheetId] };
              // assign priorities for datasheets to sort them after
              if (foundProductsDatasheets[datasheetId]) {
                foundDatasheets[datasheetId].priority = 0;
              }

              if (foundProductsRelatedDatasheets[datasheetId]) {
                foundDatasheets[datasheetId].priority = 1;
              }
            }

            return foundDatasheets;
          },
          {},
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

    if (productIds && foundProducts.length === productIds.length) {
      setFoundProducts(foundProducts);
      // if an item by id was found we should not load next db part
      return;
    }
    // setSearchOffset(db.items.length - 1);
    if (!loadNextDbPart()) {
      // finish
      setIsSearching(false);
      setFoundProducts(foundProducts);
    }
  }, [db, productIds, searchKeywords, categoryId]);

  const baseSearch = React.useCallback(
    ({ ids, text, categoryId }: Omit<SearchHandler, 'debounce'>) => {
      if (ids !== undefined) {
        setProductIds(ids);
        return;
      }

      if (text !== undefined) {
        const searchKeywords = text
          .toLowerCase()
          .split(' ')
          .filter(keyword => keyword);

        setSearchKeywords(searchKeywords);
      }

      if (categoryId !== undefined) {
        setCategoryId(categoryId);
      }
    },
    [],
  );

  const debouncedSearch = React.useMemo(() => debounce(baseSearch, 750), []);

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
    foundProducts,
    foundDatasheets,
  };
};
