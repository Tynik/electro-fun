import React from 'react';

import type { Item } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { DbContext } from '~/contexts';
import { useItemManufacturer } from '~/hooks';

type ItemBrandMicrodataProps = {
  item: Item;
};

export const ItemBrandMicrodata = ({ item }: ItemBrandMicrodataProps) => {
  const { db } = React.useContext(DbContext);

  const manufacturer = useItemManufacturer(item);
  if (!manufacturer) {
    return null;
  }

  return (
    <div itemProp={'brand'} itemType={`${SEO_SCHEMA_BASE_URL}/Brand`} itemScope>
      <meta itemProp={'name'} content={manufacturer.name} />

      {manufacturer.url && <meta itemProp={'url'} content={manufacturer.url} />}

      {manufacturer.logo && (
        <meta itemProp={'logo'} content={`${db.siteURL}/logos/${manufacturer.logo}`} />
      )}
    </div>
  );
};
