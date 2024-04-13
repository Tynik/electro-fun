import React from 'react';

import type { Product } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { ProductOfferMicrodata, ProductBrandMicrodata } from '~/helpers';
import { getProductContributorAvatarSrc } from '~/utils';

export type ProductMicrodataProps = {
  product: Product;
};

export const ProductMicrodata = ({ product }: ProductMicrodataProps) => {
  return (
    <div itemType={`${SEO_SCHEMA_BASE_URL}/Product`} itemScope>
      <ProductBrandMicrodata product={product} />

      {Boolean(product.price) && <ProductOfferMicrodata product={product} />}

      <meta itemProp="name" content={product.title} />

      {product.content && <meta itemProp="description" content={product.content} />}

      {product.gtin && <meta itemProp="gtin" content={product.gtin} />}
      {product.mpn && <meta itemProp="mpn" content={product.mpn} />}

      {(product.images || []).map(image => (
        <meta key={image.src} itemProp="image" content={image.src} />
      ))}

      {(product.contributors || []).map(contributor => (
        <div
          key={contributor.name}
          itemType={`${SEO_SCHEMA_BASE_URL}/Person`}
          itemProp={'contributor'}
          itemScope
        >
          <meta itemProp="name" content={contributor.name} />
          <meta itemProp="image" content={getProductContributorAvatarSrc(contributor.src)} />
        </div>
      ))}
    </div>
  );
};
