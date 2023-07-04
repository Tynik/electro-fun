import React from 'react';

import type { CategoryId } from '~/types';

import { DbContext } from '~/contexts';

export const useCategory = (categoryId: CategoryId) => {
  const { db } = React.useContext(DbContext);

  return React.useMemo(
    () => db.categories.find(category => category.id === categoryId),
    [db, categoryId]
  );
};
