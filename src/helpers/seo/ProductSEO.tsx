import React from 'react';

import { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { DbContext } from '~/contexts';
import { OfferSEO } from '~/helpers';
import { getItemContributorAvatarSrc } from '~/utils';

export type ProductSEOProps = {
  item: ItemT
}

export const ProductSEO = ({ item }: ProductSEOProps) => {
  const { db } = React.useContext(DbContext);

  return (
    <div
      itemType={`${SEO_SCHEMA_BASE_URL}/Product`}
      itemScope
    >
      <meta itemProp={'name'} content={item.title}/>

      {(item.images || []).length > 0 && (
        <meta itemProp={'image'} content={item.images[0].src}/>
      )}

      {item.content && (
        <meta itemProp={'description'} content={item.content}/>
      )}

      {item.manufacturerId && (
        <div
          itemProp={'brand'}
          itemType={`${SEO_SCHEMA_BASE_URL}/Brand`}
          itemScope
        >
          <meta itemProp={'name'} content={db.manufacturers[item.manufacturerId]}/>
        </div>
      )}

      {item.price && (
        <OfferSEO item={item}/>
      )}

      {item.contributors && item.contributors.map(contributor => (
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
