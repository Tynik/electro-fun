import React from 'react';

import type { Product } from '~/types';
import type { StripeProduct } from '~/api';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import {
  ProductOfferMicrodata,
  ProductManufacturerMicrodata,
  ProductFeatureMicrodata,
} from '~/helpers';
import { getProductContributorAvatarSrc } from '~/utils';

export type ProductMicrodataProps = {
  product: Product;
  stripeProduct: StripeProduct | undefined;
};

export const ProductMicrodata = ({ product, stripeProduct }: ProductMicrodataProps) => {
  return (
    <div itemType={`${SEO_SCHEMA_BASE_URL}/Product`} itemScope>
      <ProductManufacturerMicrodata product={product} />

      <ProductOfferMicrodata product={product} stripeProduct={stripeProduct} />

      <meta itemProp="name" content={product.title} />

      {product.seo?.keywords && <meta itemProp="keywords" content={product.seo.keywords} />}
      {product.content && <meta itemProp="description" content={product.content} />}

      {product.gtin && <meta itemProp="gtin" content={product.gtin} />}
      {product.mpn && <meta itemProp="mpn" content={product.mpn} />}

      {(product.images || []).map(image => (
        <meta key={image.src} itemProp="image" content={image.src} />
      ))}

      {product.features?.map((feature, featureIndex) => (
        <ProductFeatureMicrodata key={featureIndex} feature={feature} />
      ))}

      {(product.contributors || []).map(contributor => (
        <div
          key={contributor.name}
          itemType={`${SEO_SCHEMA_BASE_URL}/Person`}
          itemProp="contributor"
          itemScope
        >
          <meta itemProp="name" content={contributor.name} />

          {contributor.src && (
            <meta itemProp="image" content={getProductContributorAvatarSrc(contributor.src)} />
          )}
        </div>
      ))}
    </div>
  );
};
