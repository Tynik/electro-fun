import React from 'react';

import type { Product } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { useSelectedProductOptionId } from '~/hooks';
import { getProductAllowedQuantity } from '~/helpers';

export type ProductInventoryLevelMicrodataProps = {
  product: Product;
};

export const ProductInventoryLevelMicrodata = ({
  product,
}: ProductInventoryLevelMicrodataProps) => {
  const selectedProductOptionId = useSelectedProductOptionId(product);
  const productAvailability = getProductAllowedQuantity(product, selectedProductOptionId);

  return (
    <div
      itemProp={'inventoryLevel'}
      itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`}
      itemScope
    >
      <meta itemProp={'value'} content={productAvailability.toString()} />
    </div>
  );
};
