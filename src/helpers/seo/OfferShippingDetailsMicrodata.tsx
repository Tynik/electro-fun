import React from 'react';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { MonetaryAmountMicrodata } from '~/helpers';

type OfferShippingDetailsMicrodataProps = {
  //
};

export const OfferShippingDetailsMicrodata = (props: OfferShippingDetailsMicrodataProps) => {
  return (
    <div
      itemProp={'shippingDetails'}
      itemType={`${SEO_SCHEMA_BASE_URL}/OfferShippingDetails`}
      itemScope
    >
      <MonetaryAmountMicrodata property="shippingRate" minValue="1.35" maxValue="7.00" />

      <div
        itemProp={'shippingDestination'}
        itemType={`${SEO_SCHEMA_BASE_URL}/DefinedRegion`}
        itemScope
      >
        <meta itemProp={'addressCountry'} content={'UK'} />
      </div>

      <div
        itemProp={'deliveryTime'}
        itemType={`${SEO_SCHEMA_BASE_URL}/ShippingDeliveryTime`}
        itemScope
      >
        <div
          itemProp={'handlingTime'}
          itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`}
          itemScope
        >
          <meta itemProp={'minValue'} content={'1'} />
          <meta itemProp={'maxValue'} content={'2'} />
          <meta itemProp={'unitCode'} content={'d'} />
        </div>

        <div
          itemProp={'transitTime'}
          itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`}
          itemScope
        >
          <meta itemProp={'minValue'} content={'1'} />
          <meta itemProp={'maxValue'} content={'4'} />
          <meta itemProp={'unitCode'} content={'d'} />
        </div>

        <meta itemProp={'cutOffTime'} content={'19:00-09:00'} />

        <div
          itemProp={'businessDays'}
          itemType={`${SEO_SCHEMA_BASE_URL}/OpeningHoursSpecification`}
          itemScope
        >
          <meta itemProp={'dayOfWeek'} content={`${SEO_SCHEMA_BASE_URL}/Monday`} />
          <meta itemProp={'dayOfWeek'} content={`${SEO_SCHEMA_BASE_URL}/Tuesday`} />
          <meta itemProp={'dayOfWeek'} content={`${SEO_SCHEMA_BASE_URL}/Wednesday`} />
          <meta itemProp={'dayOfWeek'} content={`${SEO_SCHEMA_BASE_URL}/Thursday`} />
          <meta itemProp={'dayOfWeek'} content={`${SEO_SCHEMA_BASE_URL}/Friday`} />
        </div>
      </div>
    </div>
  );
};
