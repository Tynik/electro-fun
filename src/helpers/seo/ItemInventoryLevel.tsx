import React from 'react';

import type { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';

export type ItemInventoryLevelProps = {
  item: ItemT
}

export const ItemInventoryLevel = ({ item }: ItemInventoryLevelProps) => {
  if (!item.availability) {
    return null;
  }
  return (
    <div
      itemProp={'inventoryLevel'}
      itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`}
      itemScope
    >
      <meta itemProp={'value'} content={item.availability.toString()}/>
    </div>
  );
};
