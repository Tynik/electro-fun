import React from 'react';

import type { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { DbContext } from '~/contexts';
import { useItemManufacturer } from '~/hooks';

export type ItemManufacturerProps = {
  item: ItemT
}

export const ItemManufacturer = ({ item }: ItemManufacturerProps) => {
  const { db } = React.useContext(DbContext);

  const manufacturer = useItemManufacturer(item);
  if (!manufacturer) {
    return null;
  }

  return (
    <div
      itemProp={'brand'}
      itemType={`${SEO_SCHEMA_BASE_URL}/Brand`}
      itemScope
    >
      <meta itemProp={'name'} content={manufacturer.name}/>

      {manufacturer.url && (
        <meta itemProp={'url'} content={manufacturer.url}/>
      )}

      {manufacturer.logo && (
        <meta
          itemProp={'logo'}
          content={`${db.siteURL}/logos/${manufacturer.logo}`}
        />
      )}
    </div>
  );
};
