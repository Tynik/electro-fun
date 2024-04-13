import React from 'react';

import { DbContext } from '~/contexts';
import { useJsonDbSearch, useCurrentCategory } from '~/hooks';

export const useCurrentCategoryProducts = () => {
  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundProducts } = useJsonDbSearch(db, loadNextDbPart);

  const category = useCurrentCategory();

  React.useEffect(() => {
    if (category) {
      search({ categoryId: category.id });
    }
  }, [category]);

  return { category, foundProducts };
};
