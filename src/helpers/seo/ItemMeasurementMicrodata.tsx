import React from 'react';

import type { Item } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';

export type ItemMeasurementMicrodataProps = {
  item: Item;
};

export const ItemMeasurementMicrodata = ({ item }: ItemMeasurementMicrodataProps) => {
  if (!item.seo || !item.seo.measurement) {
    return null;
  }
  return (
    <div
      itemProp={'hasMeasurement'}
      itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`}
      itemScope
    >
      <meta itemProp={'value'} content={item.seo.measurement} />
    </div>
  );
};
