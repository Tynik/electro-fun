import React from 'react';

import type { Nullable, Product, ProductOptionId } from '~/types';

import { DEFAULT_PRODUCT_OPTION_ID } from '~/constants';
import { useQueryParams } from '~/utils';
import { getProductDefaultOption } from '~/helpers';

export const useSelectedProductOptionId = (
  product: Nullable<Product>,
  allowToSelectDefault = true,
): ProductOptionId => {
  const { optionId: selectedProductOptionId } = useQueryParams();

  return React.useMemo(() => {
    if (selectedProductOptionId) {
      return selectedProductOptionId;
    }

    if (!product || !allowToSelectDefault) {
      return DEFAULT_PRODUCT_OPTION_ID;
    }

    return getProductDefaultOption(product);
  }, [product, selectedProductOptionId]);
};
