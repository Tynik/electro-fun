import React from 'react';

import { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { DbContext } from '~/contexts';
import { OfferSEO } from '~/helpers';

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
    </div>
  );
};
