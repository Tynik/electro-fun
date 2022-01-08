import React from 'react';

import type { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { DbContext } from '~/contexts';
import { OfferSEO } from '~/helpers';
import { getItemContributorAvatarSrc } from '~/utils';

export type ProductSEOProps = {
  item: ItemT
}

export const ProductSEO = ({ item }: ProductSEOProps) => {
  const { db } = React.useContext(DbContext);

  const manufacturer = item.manufacturerId && db.manufacturers[item.manufacturerId];

  return (
    <div
      itemType={`${SEO_SCHEMA_BASE_URL}/Product`}
      itemScope
    >
      <meta itemProp={'name'} content={item.title}/>

      {(item.images || []).map(image => (
        <meta key={image.src} itemProp={'image'} content={image.src}/>
      ))}

      {item.content && (
        <meta itemProp={'description'} content={item.content}/>
      )}

      {manufacturer && (
        <div
          itemProp={'brand'}
          itemType={`${SEO_SCHEMA_BASE_URL}/Brand`}
          itemScope
        >
          <meta itemProp={'name'} content={manufacturer.name}/>
          <meta itemProp={'url'} content={manufacturer.url}/>
          <meta
            itemProp={'logo'}
            content={`${db.siteURL}/logos/${manufacturer.logo}`}
          />
        </div>
      )}

      {item.price && (
        <OfferSEO item={item}/>
      )}

      {(item.contributors || []).map(contributor => (
        <div
          key={contributor.name}
          itemType={`${SEO_SCHEMA_BASE_URL}/Person`}
          itemProp={'contributor'}
          itemScope
        >
          <meta itemProp={'name'} content={contributor.name}/>
          <meta itemProp={'image'} content={getItemContributorAvatarSrc(contributor.src)}/>
        </div>
      ))}
    </div>
  );
};
