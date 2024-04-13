import React from 'react';

import type { Product, ProductFeature } from '~/types';

import { useSelectedProductOptionId } from '~/hooks';

export const useProductFeatures = (item: Product): ProductFeature[] | null => {
  const selectedProductOptionId = useSelectedProductOptionId(item);

  return React.useMemo(
    () =>
      (item &&
        item.features.filter(
          itemFeature => !itemFeature.optionId || itemFeature.optionId === selectedProductOptionId,
        )) ||
      [],
    [item, selectedProductOptionId],
  );
};
