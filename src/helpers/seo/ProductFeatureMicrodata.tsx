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

  const featureValueSuffix = db.itemFeatures[feature.refId].suffix ?? '';

  const featureName = featSecRefId
    ? `${db.featureSections[featSecRefId]} - ${db.itemFeatures[feature.refId].name}`
    : db.itemFeatures[feature.refId].name;

  const featureValue = Array.isArray(feature.value)
    ? feature.value.map(featureValue => {
        if (typeof featureValue === 'string' || typeof featureValue === 'number') {
          return featureValue;
        }

        return Array.isArray(featureValue.value)
          ? featureValue.value.join(',')
          : `${featureValue.value}${featureValueSuffix}`;
      })
    : `${feature.value}${featureValueSuffix}`;

  return (
    <QuantitativeValueMicrodata
      key={feature.refId}
      name={featureName}
      value={featureValue}
      property="hasMeasurement"
    />
  );
};
