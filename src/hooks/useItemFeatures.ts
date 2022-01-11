import React from 'react';

import type { ItemT, ItemFeatureT } from '~/types';

import { useSelectedItemOptionId } from '~/hooks';

export const useItemFeatures = (item: ItemT): ItemFeatureT[] | null => {
  const selectedItemOptionId = useSelectedItemOptionId(item);

  return React.useMemo(() =>
      item && item.features.filter(itemFeature =>
        !itemFeature.optionId || itemFeature.optionId === selectedItemOptionId
      ) || [],
    [item, selectedItemOptionId]
  );
};
