import React from 'react';

import type { ProductFeature } from '~/types';

import { DbContext } from '~/providers';
import { QuantitativeValueMicrodata } from '~/helpers';

type ProductFeatureMicrodataProps = {
  feature: ProductFeature;
};

export const ProductFeatureMicrodata = ({ feature }: ProductFeatureMicrodataProps) => {
  const { db } = React.useContext(DbContext);

  const featSecRefId = db.itemFeatures[feature.refId].featSecRefId;

  const featureName = featSecRefId
    ? `${db.featureSections[featSecRefId]} - ${db.itemFeatures[feature.refId].name}`
    : db.itemFeatures[feature.refId].name;

  const featureValue = Array.isArray(feature.value)
    ? feature.value.map(v => {
        if (typeof v === 'string' || typeof v === 'number') {
          return v;
        }

        return Array.isArray(v.value) ? v.value.join(',') : v.value;
      })
    : feature.value;

  return (
    <QuantitativeValueMicrodata
      key={feature.refId}
      name={featureName}
      value={featureValue}
      property="hasMeasurement"
    />
  );
};
