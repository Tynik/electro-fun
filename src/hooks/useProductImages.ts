import React from 'react';

import type { Product, ProductImage } from '~/types';

import { useSelectedProductOptionId } from '~/hooks';

export const useProductImages = (product: Product): ProductImage[] | null => {
  const selectedProductOptionId = useSelectedProductOptionId(product, false);

  return React.useMemo(() => {
    return (
      (product &&
        product.images.filter(
          productImage =>
            !productImage.optionId ||
            !selectedProductOptionId ||
            productImage.optionId === selectedProductOptionId,
        )) ||
      []
    );
  }, [product, selectedProductOptionId]);
};
