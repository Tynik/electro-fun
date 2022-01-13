import React from 'react';

import type { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { useSelectedItemOptionId } from '~/hooks';
import { getItemAvailability } from '~/helpers';

export type ItemInventoryLevelProps = {
  item: ItemT
}

export const ItemInventoryLevel = ({ item }: ItemInventoryLevelProps) => {
  const selectedItemOptionId = useSelectedItemOptionId(item);
  const itemAvailability = getItemAvailability(item, selectedItemOptionId);

  return (
    <div
      itemProp={'inventoryLevel'}
      itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`}
      itemScope
    >
      <meta itemProp={'value'} content={itemAvailability.toString()}/>
    </div>
  );
};
