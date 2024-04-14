import React from 'react';

import type { Product } from '~/types';

import { DbContext } from '~/providers';

export const useItemManufacturer = (item: Product) => {
  const { db } = React.useContext(DbContext);

  return item.manufacturerId && db.manufacturers[item.manufacturerId];
};
