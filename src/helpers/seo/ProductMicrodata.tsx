import React from 'react';

import type { Item } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { OfferMicrodata, ItemBrandMicrodata } from '~/helpers';
import { getItemContributorAvatarSrc } from '~/utils';

export type ProductMicrodataProps = {
  item: Item;
};

export const ProductMicrodata = ({ item }: ProductMicrodataProps) => {
  return (
    <div itemType={`${SEO_SCHEMA_BASE_URL}/Product`} itemScope>
      <ItemBrandMicrodata item={item} />

      {Boolean(item.price) && <OfferMicrodata item={item} />}

      <meta itemProp="name" content={item.title} />

      {item.content && <meta itemProp="description" content={item.content} />}

      {item.gtin && <meta itemProp="gtin" content={item.gtin} />}
      {item.mpn && <meta itemProp="mpn" content={item.mpn} />}

      {(item.images || []).map(image => (
        <meta key={image.src} itemProp="image" content={image.src} />
      ))}

      {(item.contributors || []).map(contributor => (
        <div
          key={contributor.name}
          itemType={`${SEO_SCHEMA_BASE_URL}/Person`}
          itemProp={'contributor'}
          itemScope
        >
          <meta itemProp="name" content={contributor.name} />
          <meta itemProp="image" content={getItemContributorAvatarSrc(contributor.src)} />
        </div>
      ))}
    </div>
  );
};
