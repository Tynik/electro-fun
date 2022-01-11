import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Box,
  ButtonGroup,
  Paper,
  Typography,
  Chip,
  useMediaQuery
} from '@mui/material';

import type { ItemT, ItemOptionIdT } from '~/types';

import { UserContext } from '~/contexts';
import { CIconButton } from '~/components';
import { getIcon } from '~/utils';
import { getItemPrice } from '~/helpers';

export type BasketItemProps = {
  item: ItemT
  optionId: ItemOptionIdT
}

const BasketItem = ({ item, optionId }: BasketItemProps) => {
  const {
    user: { basket },
    addItemToBasket,
    removeItemFromBasket
  } = React.useContext(UserContext);

  const smMatch = useMediaQuery<any>((theme) => theme.breakpoints.up('sm'));

  const price = (
    getItemPrice(item, optionId) * basket.items[item.id][optionId]
  ).toFixed(2);

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

          {optionId !== 'undefined' && (
            <Chip
              size={'small'}
              color={'info'}
              label={item.options[optionId].name}
              sx={{ marginLeft: 1 }}
            />
          )}
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
        <Typography variant={'subtitle1'} component={'div'}>
          {price}
        </Typography>

        <ButtonGroup
          size={'small'}
          aria-label={'Кол-во'}
          orientation={smMatch ? 'horizontal' : 'vertical'}
          sx={{ marginLeft: 2 }}
        >
          <Button
            disabled={basket.items[item.id][optionId] === 1}
            onClick={() => removeItemFromBasket(item.id, optionId)}
          >
            -
          </Button>
          <Button disabled>{basket.items[item.id][optionId]}</Button>
          <Button onClick={() => addItemToBasket(item.id, optionId)}>+</Button>
        </ButtonGroup>
      </Box>

      <Box sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center'
      }}>
        <CIconButton
          onClick={() => removeItemFromBasket(item.id, optionId, true)}
          icon={getIcon('deleteForever')}
        />
      </Box>
    </Paper>
  );
};

export default BasketItem;
