import React from 'react';

import type { Product } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import {
  getProductPrice,
  getProductAvailabilitySeoSchema,
  OfferShippingDetailsMicrodata,
  ProductMeasurementMicrodata,
  MerchantReturnPolicyMicrodata,
  ProductInventoryLevelMicrodata,
} from '~/helpers';
import { useCategory, useSelectedProductOptionId } from '~/hooks';

export type ProductOfferMicrodataProps = {
  product: Product;
};

export const ProductOfferMicrodata = ({ product }: ProductOfferMicrodataProps) => {
  const selectedProductOptionId = useSelectedProductOptionId(product);

  const productPrice = getProductPrice(product, selectedProductOptionId);
  const productAvailabilitySEOSchema = getProductAvailabilitySeoSchema(
    product,
    selectedProductOptionId,
  );

  const category = useCategory(product.categoryId);
  if (!category) {
    return null;
  }

  return (
    <div itemProp={'offers'} itemType={`${SEO_SCHEMA_BASE_URL}/Offer`} itemScope>
      <meta itemProp={'url'} content={`/item/${product.id}`} />
      <meta itemProp={'category'} content={category.name} />
      <meta itemProp={'price'} content={productPrice.toString()} />
      <meta itemProp={'priceCurrency'} content={'GBP'} />
      <meta itemProp={'availability'} content={productAvailabilitySEOSchema} />
      <meta itemProp={'itemCondition'} content={`${SEO_SCHEMA_BASE_URL}/NewCondition`} />

      <MerchantReturnPolicyMicrodata />

      <ProductInventoryLevelMicrodata product={product} />
      <ProductMeasurementMicrodata product={product} />

      <OfferShippingDetailsMicrodata />
    </div>
  );
};
