import React from 'react';

import { DbContext } from '~/contexts';
import { useJsonDbSearch, useCurrentCategory } from '~/hooks';

export const useCurrentCategoryItems = () => {
  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useJsonDbSearch(db, loadNextDbPart);

  const category = useCurrentCategory();

  React.useEffect(() => {
    if (category) {
      search({ categoryId: category.id })
    }
  }, [category]);

  return { category, foundItems };
}
