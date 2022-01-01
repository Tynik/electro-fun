import React from 'react';
import {
  Badge,
  Button,
  Stack,
} from '@mui/material';
import {
  Link as LinkIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

import type { ItemT } from '../../types';

import { DbContext, UserContext } from '../../contexts';
import { ExternalButtonLink } from '../../components';
import { getIcon, useQueryParams } from '../../utils';
import { useUpMediaQuery } from '../../hooks';
import { getItemDefaultOption } from '../../helpers';

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

  const itemInBasket = (user.basket.items[item.id] || {})[itemOptionId];

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
        <Badge
          badgeContent={itemInBasket && `x${itemInBasket}`}
          color={'success'}
        >
          <Button
            onClick={() => addItemToBasket(item.id, itemOptionId)}
            variant={itemInBasket ? 'outlined' : 'contained'}
            color={itemInBasket ? 'info' : 'success'}
            startIcon={getIcon('addShoppingCart')}
            size={smMatch ? 'medium' : 'small'}
          >
            {itemInBasket ? 'В корзине' : 'В корзину'}
          </Button>
        </Badge>
      )}
    </Stack>
  );
};
