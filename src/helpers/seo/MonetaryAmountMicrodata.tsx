import { SEO_SCHEMA_BASE_URL } from '~/constants';
import React from 'react';

type MonetaryAmountMicrodataProps = {
  property: string;
  minValue?: string;
  maxValue?: string;
  currency?: string;
};

export const MonetaryAmountMicrodata = ({
  property,
  minValue,
  maxValue,
  currency = 'GBP',
}: MonetaryAmountMicrodataProps) => {
  return (
    <div itemProp={property} itemType={`${SEO_SCHEMA_BASE_URL}/MonetaryAmount`} itemScope>
      {minValue && <meta itemProp="minValue" content={minValue} />}
      {maxValue && <meta itemProp="maxValue" content={maxValue} />}

      <meta itemProp="currency" content={currency} />
    </div>
  );
};
