import React from 'react';
import { Box, Badge, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { Link as LinkIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

import type { StripeProduct } from '~/api';
import type { Product } from '~/types';

import { DbContext, UserContext } from '~/contexts';
import { ExternalButtonLink } from '~/components';
import { getIcon } from '~/utils';
import { useSelectedProductOptionId } from '~/hooks';
import { getProductAllowedQuantity } from '~/helpers';

export type ProductInfoActionsProps = {
  product: Product;
  stripeProduct: StripeProduct | undefined;
};

export const ProductInfoActions = ({ product, stripeProduct }: ProductInfoActionsProps) => {
  const { db } = React.useContext(DbContext);
  const { getNumberProductsInBasket, addProductToBasket } = React.useContext(UserContext);

  const selectedProductOptionId = useSelectedProductOptionId(product);
  const numberProductsInBasket = getNumberProductsInBasket(product, selectedProductOptionId);

  const downSmMatch = useMediaQuery<any>(theme => theme.breakpoints.down('sm'));

  const initialProductAvailability = getProductAllowedQuantity(
    stripeProduct,
    product,
    selectedProductOptionId,
  );

  const productAvailability = product.buy
    ? numberProductsInBasket
      ? initialProductAvailability - numberProductsInBasket
      : initialProductAvailability
    : 0;

  const datasheet = product.datasheetId ? db.datasheets[product.datasheetId] : null;

  return (
    <Stack
      spacing={2}
      direction={downSmMatch ? 'column' : 'row'}
      alignItems={downSmMatch ? 'center' : 'normal'}
      justifyContent={'center'}
    >
      {datasheet && (
        <ExternalButtonLink
          href={`/assets/datasheets/${product.datasheetId}.pdf`}
          hrefLang={datasheet.lang}
          variant={'outlined'}
          startIcon={<LinkIcon />}
        >
          Datasheet
        </ExternalButtonLink>
      )}

      {typeof product.buy === 'string' && product.buy && (
        <ExternalButtonLink
          href={product.buy}
          variant={'contained'}
          color={'success'}
          startIcon={<ShoppingCartIcon />}
        >
          Buy
        </ExternalButtonLink>
      )}

      {product.buy === true && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {initialProductAvailability ? (
            <>
              <Badge
                badgeContent={numberProductsInBasket && `x${numberProductsInBasket}`}
                color={productAvailability >= 0 ? 'success' : 'error'}
              >
                <Button
                  onClick={() => addProductToBasket(product.id, selectedProductOptionId)}
                  variant={numberProductsInBasket ? 'outlined' : 'contained'}
                  color={numberProductsInBasket ? 'info' : 'success'}
                  startIcon={getIcon('addShoppingCart')}
                  disabled={!productAvailability}
                >
                  {numberProductsInBasket ? 'In cart' : 'Add to cart'}
                </Button>
              </Badge>

              <Typography variant={'body2'} color={'primary.dark'} marginLeft={2}>
                In Stock: {productAvailability}
              </Typography>
            </>
          ) : (
            <Typography variant={'body2'} color={'primary.dark'} marginLeft={2}>
              Out of Stock
            </Typography>
          )}
        </Box>
      )}
    </Stack>
  );
};
