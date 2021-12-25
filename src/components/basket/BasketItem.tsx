import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography
} from '@material-ui/core';

import type { ItemT } from '../../types';

import { UserContext } from '../../contexts';
import { CIconButton } from '../../components';
import { getIcon } from '../../utils';

export type BasketItemProps = {
  item: ItemT
}

const BasketItem = ({ item }: BasketItemProps) => {
  const {
    user: { basket },
    addItemToBasket,
    removeItemFromBasket
  } = React.useContext(UserContext);

  return (
    <Paper
      key={item.id}
      sx={{
        padding: 2,
        height: '100px',
        display: 'flex',
        gap: 2
      }}>
      <RouterLink to={`/item/${item.id}`} style={{ height: '100%' }}>
        <img
          src={item.images[0].src}
          alt={item.images[0].alt}
          style={{ objectFit: 'cover', height: '100%' }}
        />
      </RouterLink>

      <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Typography variant={'subtitle2'} component={'div'}>
          {item.title}
        </Typography>

        <Typography
          variant={'body2'}
          component={'div'}
          display={{ xs: 'none', sm: 'block' }}
        >
          {item.subtitle}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }}/>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonGroup
          size={'small'}
          aria-label={'Кол-во'}
        >
          <Button
            disabled={basket.items[item.id] === 1}
            onClick={() => removeItemFromBasket(item.id)}
          >
            -
          </Button>
          <Button disabled>{basket.items[item.id]}</Button>
          <Button onClick={() => addItemToBasket(item.id)}>+</Button>
        </ButtonGroup>
      </Box>

      <Box sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center'
      }}>
        <CIconButton
          onClick={() => removeItemFromBasket(item.id, true)}
          icon={getIcon('deleteForever')}
        />
      </Box>
    </Paper>
  );
};

export default BasketItem;
