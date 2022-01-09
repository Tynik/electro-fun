import React from 'react';

import type { CategoryIdT } from '~/types';

import { DbContext } from '~/contexts';

export const useCategory = (categoryId: CategoryIdT) => {
  const { db } = React.useContext(DbContext);

  return React.useMemo(() =>
      db.categories.find(category => category.id === categoryId),
    [db, categoryId]
  );
}
