import React from 'react';
import { useParams } from 'react-router-dom';

import type { Item } from '~/types';

import { DbContext } from '~/contexts';
import { getItemPrice } from '~/helpers';
import { useJsonDbSearch, useStaticErrors, useSelectedItemOptionId, useItemImages } from '~/hooks';

export const useCurrentItem = () => {
  const { id } = useParams<{ id: string }>();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useJsonDbSearch(db, loadNextDbPart);

  const [item, setItem] = React.useState<Item>(null);
  const { errors, setErrors, printErrors } = useStaticErrors();

  const selectedItemOptionId = useSelectedItemOptionId(item);

  const images = useItemImages(item);

  React.useEffect(() => {
    search({ ids: [id] });
  }, []);

  React.useEffect(() => {
    if (!foundItems) {
      return;
    }
    if (foundItems.length) {
      setItem(foundItems[0]);
    } else {
      setErrors([`"${id}" was not found`]);
    }
  }, [foundItems]);

  const seo = React.useMemo(
    () => ({
      ...(item && {
        ...(item.seo || {}),
        title:
          item.seo && item.seo.title
            ? `${db.seo.title} - ${item.seo.title}`
            : `${db.seo.title} - ${item.title}`,
      }),
    }),
    [db, item]
  );

  const price = item && getItemPrice(item, selectedItemOptionId);

  return {
    db,
    id,
    selectedItemOptionId,
    item,
    price,
    images,
    seo,
    errors,
    printErrors,
  };
};
