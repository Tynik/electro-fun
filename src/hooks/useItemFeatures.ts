import React from 'react';

import type { Item, ItemFeature } from '~/types';

import { useSelectedItemOptionId } from '~/hooks';

export const useItemFeatures = (item: Item): ItemFeature[] | null => {
  const selectedItemOptionId = useSelectedItemOptionId(item);

  return React.useMemo(
    () =>
      (item &&
        item.features.filter(
          itemFeature => !itemFeature.optionId || itemFeature.optionId === selectedItemOptionId
        )) ||
      [],
    [item, selectedItemOptionId]
  );
};
