import React from 'react';
import { Stack } from '@material-ui/core';
import {
  Link as LinkIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';

import { ItemT } from '../types';
import { DbContext } from '../context';
import { ExternalButtonLink } from '../components';

export type ItemInfoActionsProps = {
  item: ItemT
}

export const ItemInfoActions = ({ item }: ItemInfoActionsProps) => {
  const { db } = React.useContext(DbContext);

  return (
    <>
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
        {Boolean(item.buyLink) && (
          <ExternalButtonLink
            href={item.buyLink}
            variant={'contained'}
            color={'success'}
            startIcon={<ShoppingCartIcon/>}
          >
            Купить
          </ExternalButtonLink>
        )}
      </Stack>
    </>
  );
};
