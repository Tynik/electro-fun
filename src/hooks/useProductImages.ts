import React from 'react';

import type { Nullable, Product, ProductImage } from '~/types';

import { useSelectedProductOptionId } from '~/hooks';

export const useProductImages = (product: Nullable<Product>): ProductImage[] | null => {
  const selectedProductOptionId = useSelectedProductOptionId(product, false);

  return React.useMemo(() => {
    if (!product) {
      return [];
    }

    return product.images.filter(
      image =>
        !image.optionId || !selectedProductOptionId || image.optionId === selectedProductOptionId,
    );
  }, [product, selectedProductOptionId]);
};
