import React from 'react';

import { SEO_SCHEMA_BASE_URL } from '~/constants';

export const MerchantReturnPolicyMicrodata = () => {
  return (
    <div
      itemProp={'hasMerchantReturnPolicy'}
      itemType={`${SEO_SCHEMA_BASE_URL}/MerchantReturnPolicy`}
      itemScope
    >
      <meta
        itemProp={'description'}
        content={`Our return policy allows you to return eligible products within 30 days of purchase for a refund or exchange. Please note that certain restrictions and conditions may apply.`}
      />
      <meta itemProp={'applicableCountry'} content={`UK`} />
      <meta
        itemProp={'returnPolicyCategory'}
        content={`${SEO_SCHEMA_BASE_URL}/MerchantReturnFiniteReturnWindow`}
      />
      <meta itemProp={'returnMethod'} content={`${SEO_SCHEMA_BASE_URL}/ReturnByMail`} />
      <meta itemProp={'returnMethod'} content={`${SEO_SCHEMA_BASE_URL}/ReturnInStore`} />
      <meta itemProp={'merchantReturnDays'} content={`30`} />
      <meta itemProp={'returnFees'} content={`${SEO_SCHEMA_BASE_URL}/ReturnShippingFees`} />
    </div>
  );
};