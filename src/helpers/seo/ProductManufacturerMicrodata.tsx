import React from 'react';

import type { Product } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { DbContext } from '~/providers';
import { useItemManufacturer } from '~/hooks';

type ProductManufacturerMicrodataProps = {
  product: Product;
};

export const ProductManufacturerMicrodata = ({ product }: ProductManufacturerMicrodataProps) => {
  const { db } = React.useContext(DbContext);

  const manufacturer = useItemManufacturer(product);
  if (!manufacturer) {
    return null;
  }

  return (
    <div itemProp="manufacturer" itemType={`${SEO_SCHEMA_BASE_URL}/Organization`} itemScope>
      <meta itemProp="name" content={manufacturer.name} />

      {manufacturer.url && <meta itemProp="url" content={manufacturer.url} />}

      {manufacturer.logo && (
        <meta itemProp="logo" content={`${db.siteURL}/assets/logos/${manufacturer.logo}`} />
      )}
    </div>
  );
};
