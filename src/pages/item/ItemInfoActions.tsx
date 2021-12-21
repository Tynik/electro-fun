import React from 'react';
import {
  Badge,
  Button,
  Stack
} from '@material-ui/core';
import {
  Link as LinkIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';

import type { ItemT } from '../../types';

import { DbContext, UserContext } from '../../contexts';
import { ExternalButtonLink } from '../../components';
import { getIcon } from '../../utils';

export type ItemInfoActionsProps = {
  item: ItemT
}

export const ItemInfoActions = ({ item }: ItemInfoActionsProps) => {
  const { db } = React.useContext(DbContext);
  const { user, addItemToBasket } = React.useContext(UserContext);

  const itemInBasket = user.basket.items[item.id];

  return (
    <Stack direction={'row'} spacing={2}>
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
        <Badge
          badgeContent={itemInBasket && `x${itemInBasket}`}
          color={'success'}
        >
          <Button
            onClick={() => addItemToBasket(item.id)}
            variant={itemInBasket ? 'outlined' : 'contained'}
            color={itemInBasket ? 'info' : 'success'}
            startIcon={getIcon('addShoppingCart')}
          >
            {itemInBasket ? 'В корзине' : 'Купить'}
          </Button>
        </Badge>
      )}
    </Stack>
  );
};
