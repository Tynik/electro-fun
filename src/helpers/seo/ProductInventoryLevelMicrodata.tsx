import React from 'react';

import type { Product } from '~/types';
import type { StripeProduct } from '~/api';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { useSelectedProductOptionId } from '~/hooks';
import { getProductAllowedQuantity } from '~/helpers';

export type ProductInventoryLevelMicrodataProps = {
  product: Product;
  stripeProduct: StripeProduct | undefined;
};

export const ProductInventoryLevelMicrodata = ({
  product,
  stripeProduct,
}: ProductInventoryLevelMicrodataProps) => {
  const selectedProductOptionId = useSelectedProductOptionId(product);
  const productAvailability = getProductAllowedQuantity(
    stripeProduct,
    product,
    selectedProductOptionId,
  );

  return (
    <div itemProp="inventoryLevel" itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`} itemScope>
      <meta itemProp="value" content={productAvailability.toString()} />
    </div>
  );
};
