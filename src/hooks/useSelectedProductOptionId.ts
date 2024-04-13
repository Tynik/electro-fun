import React from 'react';

import type { Nullable, Product } from '~/types';

import { useQueryParams } from '~/utils';
import { getProductDefaultOption } from '~/helpers';

export const useSelectedProductOptionId = (
  item: Nullable<Product>,
  applyDefault = true,
): string | null => {
  const { optionId: selectedProductOptionId } = useQueryParams();

  return React.useMemo(
    () => item && (selectedProductOptionId || (applyDefault && getProductDefaultOption(item))),
    [item, selectedProductOptionId],
  );
};
