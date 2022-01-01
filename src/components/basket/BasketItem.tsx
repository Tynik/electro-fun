import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  ButtonGroup,
  Paper,
  Typography,
  Chip,
} from '@mui/material';

import type { ItemT, ItemOptionIdT } from '../../types';

import { UserContext } from '../../contexts';
import { CIconButton, CButton } from '../../components';
import { getIcon } from '../../utils';
import { getItemPrice } from '../../helpers';
import { useUpMediaQuery } from '../../hooks';

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

  const smMatch = useUpMediaQuery('sm');

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

          {optionId !== 'null' && (
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
          <CButton
            disabled={basket.items[item.id][optionId] === 1}
            onClick={() => removeItemFromBasket(item.id, optionId)}
          >
            -
          </CButton>
          <CButton disabled>{basket.items[item.id][optionId]}</CButton>
          <CButton onClick={() => addItemToBasket(item.id, optionId)}>+</CButton>
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
