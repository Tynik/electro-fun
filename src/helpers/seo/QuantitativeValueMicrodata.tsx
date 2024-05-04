import React from 'react';

import { SEO_SCHEMA_BASE_URL } from '~/constants';

export type QuantitativeValueMicrodataProps = {
  property: string;
  value: string | number | (string | number)[];
  name?: string;
  minValue?: string | number;
  maxValue?: string | number;
};

export const QuantitativeValueMicrodata = ({
  name,
  value,
  minValue,
  maxValue,
}: QuantitativeValueMicrodataProps) => {
  return (
    // https://schema.org/QuantitativeValue
    <div itemProp="hasMeasurement" itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`} itemScope>
      <meta itemProp="value" content={Array.isArray(value) ? value.join(', ') : value.toString()} />

      {name && <meta itemProp="name" content={name} />}

      {minValue && <meta itemProp="minValue" content={minValue.toString()} />}
      {maxValue && <meta itemProp="maxValue" content={maxValue.toString()} />}

      {/* https://unece.org/fileadmin/DAM/cefact/recommendations/rec20/rec20_rev3_Annex3e.pdf */}
      <meta
        itemProp="valueReference"
        content={
          Array.isArray(value)
            ? `${SEO_SCHEMA_BASE_URL}/Enumeration`
            : typeof value === 'number'
              ? `${SEO_SCHEMA_BASE_URL}/QuantitativeValue`
              : `${SEO_SCHEMA_BASE_URL}/StructuredValue`
        }
      />
    </div>
  );
};
