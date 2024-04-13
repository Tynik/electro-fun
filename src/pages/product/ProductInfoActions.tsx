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
  item: Product;
  stripeProduct: StripeProduct | undefined;
};

export const ProductInfoActions = ({ item, stripeProduct }: ProductInfoActionsProps) => {
  const { db } = React.useContext(DbContext);
  const { getNumberProductsInBasket, addProductToBasket } = React.useContext(UserContext);

  const selectedProductOptionId = useSelectedProductOptionId(item);
  const numberProductsInBasket = getNumberProductsInBasket(item, selectedProductOptionId);

  const downSmMatch = useMediaQuery<any>(theme => theme.breakpoints.down('sm'));

  const initialProductAvailability =
    stripeProduct?.quantity ?? getProductAllowedQuantity(item, selectedProductOptionId);

  const productAvailability = item.quantity
    ? numberProductsInBasket
      ? initialProductAvailability - numberProductsInBasket
      : initialProductAvailability
    : 0;

  return (
    <Stack
      spacing={2}
      direction={downSmMatch ? 'column' : 'row'}
      alignItems={downSmMatch ? 'center' : 'normal'}
      justifyContent={'center'}
    >
      {Boolean(item.datasheetId) && (
        <ExternalButtonLink
          href={`/assets/datasheets/${item.datasheetId}.pdf`}
          hrefLang={db.datasheets[item.datasheetId].lang}
          variant={'outlined'}
          startIcon={<LinkIcon />}
        >
          Datasheet
        </ExternalButtonLink>
      )}

      {typeof item.buy === 'string' && item.buy && (
        <ExternalButtonLink
          href={item.buy}
          variant={'contained'}
          color={'success'}
          startIcon={<ShoppingCartIcon />}
        >
          Buy
        </ExternalButtonLink>
      )}

      {item.buy === true && (
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
                  onClick={() => addProductToBasket(item.id, selectedProductOptionId)}
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
