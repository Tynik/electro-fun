import React from 'react';
import { useParams } from 'react-router-dom';

import type { Product } from '~/types';

import { DbContext } from '~/contexts';
import { getProductPrice } from '~/helpers';
import {
  useJsonDbSearch,
  useStaticErrors,
  useSelectedProductOptionId,
  useProductImages,
} from '~/hooks';

export const useCurrentProduct = () => {
  const { id } = useParams<{ id: string }>();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundProducts } = useJsonDbSearch(db, loadNextDbPart);

  const [product, setProduct] = React.useState<Product | null>(null);
  const { errors, setErrors, printErrors } = useStaticErrors();

  const selectedProductOptionId = useSelectedProductOptionId(product);

  const images = useProductImages(product);

  React.useEffect(() => {
    search({ ids: [id] });
  }, []);

  React.useEffect(() => {
    if (!foundProducts) {
      return;
    }
    if (foundProducts.length) {
      setProduct(foundProducts[0]);
    } else {
      setErrors([`"${id}" was not found`]);
    }
  }, [foundProducts]);

  const seo = React.useMemo(
    () => ({
      ...(product && {
        ...(product.seo || {}),
        title:
          product.seo && product.seo.title
            ? `${db.seo.title} - ${product.seo.title}`
            : `${db.seo.title} - ${product.title}`,
      }),
    }),
    [db, product],
  );

  const price = product && getProductPrice(product, selectedProductOptionId);

  return {
    db,
    id,
    selectedProductOptionId,
    product,
    price,
    images,
    seo,
    errors,
    printErrors,
  };
};
