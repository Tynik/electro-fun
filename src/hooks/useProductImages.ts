import React from 'react';

import type { Nullable, Product, ProductImage } from '~/types';

import { useSelectedProductOptionId } from '~/hooks';
import { DEFAULT_PRODUCT_OPTION_ID } from '~/constants';

export const useProductImages = (product: Nullable<Product>): ProductImage[] => {
  const selectedProductOptionId = useSelectedProductOptionId(product, false);

  return React.useMemo(() => {
    if (!product) {
      return [];
    }

    if (selectedProductOptionId === DEFAULT_PRODUCT_OPTION_ID) {
      return product.images;
    }

    return product.images.filter(
      image => !image.optionId || image.optionId === selectedProductOptionId,
    );
  }, [product, selectedProductOptionId]);
};
