import React from 'react';
import {
  Box,
  Badge,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import {
  Link as LinkIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

import type { ItemT } from '~/types';

import { DbContext, UserContext } from '~/contexts';
import { ExternalButtonLink } from '~/components';
import { getIcon, useQueryParams } from '~/utils';
import { useUpMediaQuery } from '~/hooks';
import { getItemDefaultOption, getItemAvailabilitySEOSchema } from '~/helpers';

export type ItemInfoActionsProps = {
  item: ItemT
}

export const ItemInfoActions = ({ item }: ItemInfoActionsProps) => {
  const { db } = React.useContext(DbContext);
  const { user, addItemToBasket } = React.useContext(UserContext);

  const { optionId: selectedItemOptionId } = useQueryParams();

  const itemOptionId = React.useMemo(() =>
      selectedItemOptionId || getItemDefaultOption(item),
    [selectedItemOptionId]
  );

  const smMatch = useUpMediaQuery('sm');

  const countInBasket = (user.basket.items[item.id] || {})[itemOptionId];

  const itemAvailability = countInBasket ?
    item.availability - countInBasket
    : item.availability;

  return (
    <Stack spacing={2} direction={'row'} justifyContent={'center'}>
      {Boolean(item.datasheetId) && (
        <ExternalButtonLink
          href={db.datasheets[item.datasheetId].url}
          hrefLang={db.datasheets[item.datasheetId].lang}
          variant={'outlined'}
          startIcon={<LinkIcon/>}
        >
          Datasheet
        </ExternalButtonLink>
      )}
      {typeof item.buy === 'string' && item.buy && (
        <ExternalButtonLink
          href={item.buy}
          variant={'contained'}
          color={'success'}
          startIcon={<ShoppingCartIcon/>}
        >
          Купить
        </ExternalButtonLink>
      )}
      {item.buy === true && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge
            badgeContent={countInBasket && `x${countInBasket}`}
            color={'success'}
          >
            <Button
              onClick={() => addItemToBasket(item.id, itemOptionId)}
              variant={countInBasket ? 'outlined' : 'contained'}
              color={countInBasket ? 'info' : 'success'}
              startIcon={getIcon('addShoppingCart')}
              size={smMatch ? 'medium' : 'small'}
              disabled={!itemAvailability}
            >
              {countInBasket ? 'В корзине' : 'В корзину'}
            </Button>

            <meta itemProp={'itemCondition'} content={'https://schema.org/NewCondition'}/>
          </Badge>

          <Typography
            variant={'body2'}
            color={'primary.dark'}
            marginLeft={2}
          >
            Доступно: {itemAvailability}

            <meta itemProp={'availability'} content={getItemAvailabilitySEOSchema(item)}/>
          </Typography>
        </Box>
      )}
    </Stack>
  );
};
