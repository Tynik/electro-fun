import React from 'react';

import type { ItemT } from '~/types';

import { DbContext } from '~/contexts';

export const useItemManufacturer = (item: ItemT) => {
  const { db } = React.useContext(DbContext);

  return item.manufacturerId && db.manufacturers[item.manufacturerId];
};
