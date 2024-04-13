import React from 'react';

import type { Product } from '~/types';
import type { StripeProduct } from '~/api';

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
  stripeProduct: StripeProduct | undefined;
};

export const ProductOfferMicrodata = ({ product, stripeProduct }: ProductOfferMicrodataProps) => {
  const selectedProductOptionId = useSelectedProductOptionId(product);

  const productPrice = getProductPrice(stripeProduct, product, selectedProductOptionId);
  const productAvailabilitySEOSchema = getProductAvailabilitySeoSchema(
    stripeProduct,
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

      <ProductInventoryLevelMicrodata product={product} stripeProduct={stripeProduct} />
      <ProductMeasurementMicrodata product={product} />

      <OfferShippingDetailsMicrodata />
    </div>
  );
};
