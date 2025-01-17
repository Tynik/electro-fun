import React from 'react';
import { useParams } from 'react-router-dom';

import type { Nullable, Product } from '~/types';

import { DbContext } from '~/providers';
import { getProductPrice } from '~/helpers';
import {
  useJsonDbSearch,
  useStaticErrors,
  useSelectedProductOptionId,
  useProductImages,
} from '~/hooks';
import { useQuery } from 'react-query';
import { getStripeProduct } from '~/api';

export const useCurrentProduct = () => {
  const { id } = useParams<{ id: string }>();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundProducts } = useJsonDbSearch(db, loadNextDbPart);

  const [product, setProduct] = React.useState<Nullable<Product>>(null);
  const { errors, setErrors, printErrors } = useStaticErrors();

  const selectedProductOptionId = useSelectedProductOptionId(product);

  const images = useProductImages(product);

  React.useEffect(() => {
    if (id) {
      search({ ids: [id] });
    }
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

  const {
    data: stripeProduct,
    isFetching: isStripeProductFetching,
    isError: isStripeProductError,
  } = useQuery(
    ['stripe-product', product?.stripeProductId],
    () => getStripeProduct(product!.stripeProductId!),
    {
      enabled: Boolean(product?.stripeProductId),
    },
  );

  const price = product && getProductPrice(stripeProduct, product, selectedProductOptionId);

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
    stripeProduct,
    isStripeProductFetching,
    isStripeProductError,
  };
};
