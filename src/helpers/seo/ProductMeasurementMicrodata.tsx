import React from 'react';

import type { Product } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';

export type ProductMeasurementMicrodataProps = {
  product: Product;
};

export const ProductMeasurementMicrodata = ({ product }: ProductMeasurementMicrodataProps) => {
  if (!product.seo || !product.seo.measurement) {
    return null;
  }

  return (
    <div itemProp="hasMeasurement" itemType={`${SEO_SCHEMA_BASE_URL}/QuantitativeValue`} itemScope>
      <meta itemProp="value" content={product.seo.measurement} />
    </div>
  );
};
