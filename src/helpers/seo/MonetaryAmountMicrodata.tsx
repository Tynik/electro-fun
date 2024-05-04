import { SEO_SCHEMA_BASE_URL } from '~/constants';
import React from 'react';

type MonetaryAmountMicrodataProps = {
  property: string;
  value?: string | number;
  minValue?: string | number;
  maxValue?: string | number;
  currency?: string;
};

export const MonetaryAmountMicrodata = ({
  property,
  value,
  minValue,
  maxValue,
  currency = 'GBP',
}: MonetaryAmountMicrodataProps) => {
  return (
    // https://schema.org/MonetaryAmount
    <div itemProp={property} itemType={`${SEO_SCHEMA_BASE_URL}/MonetaryAmount`} itemScope>
      {value && <meta itemProp="value" content={value.toString()} />}

      {minValue && <meta itemProp="minValue" content={minValue.toString()} />}
      {maxValue && <meta itemProp="maxValue" content={maxValue.toString()} />}

      <meta itemProp="currency" content={currency} />
    </div>
  );
};
