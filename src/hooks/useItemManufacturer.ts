import React from 'react';

import type { Item } from '~/types';

import { DbContext } from '~/contexts';

export const useItemManufacturer = (item: Item) => {
  const { db } = React.useContext(DbContext);

  return item.manufacturerId && db.manufacturers[item.manufacturerId];
};
