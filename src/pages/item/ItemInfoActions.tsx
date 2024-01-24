import React from 'react';
import { Box, Badge, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { Link as LinkIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

import type { StripeProduct } from '~/api';
import type { Item } from '~/types';

import { DbContext, UserContext } from '~/contexts';
import { ExternalButtonLink } from '~/components';
import { getIcon } from '~/utils';
import { useSelectedItemOptionId } from '~/hooks';
import { getItemAllowedQuantity } from '~/helpers';

export type ItemInfoActionsProps = {
  item: Item;
  stripeProduct: StripeProduct | undefined;
};

export const ItemInfoActions = ({ item, stripeProduct }: ItemInfoActionsProps) => {
  const { db } = React.useContext(DbContext);
  const { getNumberItemsInBasket, addItemToBasket } = React.useContext(UserContext);

  const selectedItemOptionId = useSelectedItemOptionId(item);
  const numberItemsInBasket = getNumberItemsInBasket(item, selectedItemOptionId);

  const downSmMatch = useMediaQuery<any>(theme => theme.breakpoints.down('sm'));

  const initialItemAvailability =
    stripeProduct?.quantity ?? getItemAllowedQuantity(item, selectedItemOptionId);

  const itemAvailability = item.quantity
    ? numberItemsInBasket
      ? initialItemAvailability - numberItemsInBasket
      : initialItemAvailability
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
          href={
            process.env.LOCAL_ENV
              ? `/datasheets/${item.datasheetId}.pdf`
              : db.datasheets[item.datasheetId].url
          }
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
          {initialItemAvailability ? (
            <>
              <Badge
                badgeContent={numberItemsInBasket && `x${numberItemsInBasket}`}
                color={itemAvailability >= 0 ? 'success' : 'error'}
              >
                <Button
                  onClick={() => addItemToBasket(item.id, selectedItemOptionId)}
                  variant={numberItemsInBasket ? 'outlined' : 'contained'}
                  color={numberItemsInBasket ? 'info' : 'success'}
                  startIcon={getIcon('addShoppingCart')}
                  disabled={!itemAvailability}
                >
                  {numberItemsInBasket ? 'In cart' : 'Add to cart'}
                </Button>
              </Badge>

              <Typography variant={'body2'} color={'primary.dark'} marginLeft={2}>
                In Stock: {itemAvailability}
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
