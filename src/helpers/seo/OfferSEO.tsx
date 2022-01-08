import React from 'react';

import type { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { DbContext } from '~/contexts';
import { useQueryParams } from '~/utils';
import {
  getItemPrice,
  getItemAvailabilitySEOSchema,
  OfferShippingDetailsSEO
} from '~/helpers';

export type OfferSEOProps = {
  item: ItemT
}

export const OfferSEO = ({ item }: OfferSEOProps) => {
  const { db } = React.useContext(DbContext);

  const { optionId: selectedItemOptionId } = useQueryParams();

  const itemPrice = getItemPrice(item, selectedItemOptionId);

  return (
    <div
      itemProp={'offers'}
      itemType={`${SEO_SCHEMA_BASE_URL}/Offer`}
      itemScope
    >
      <meta itemProp={'url'} content={`/item/${item.id}`}/>
      <meta itemProp={'category'} content={db.categories[item.categoryId].name}/>
      <meta itemProp={'price'} content={itemPrice.toString()}/>
      <meta itemProp={'priceCurrency'} content={'UAH'}/>
      <meta itemProp={'availability'} content={getItemAvailabilitySEOSchema(item)}/>
      <meta itemProp={'itemCondition'} content={`${SEO_SCHEMA_BASE_URL}/NewCondition`}/>

      <OfferShippingDetailsSEO/>
    </div>
  );
};
