import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Box,
  ButtonGroup,
  Paper,
  Typography,
  Chip,
  Stack,
  useMediaQuery,
} from '@mui/material';

import type { Item, ItemOptionId } from '~/types';
import type { StripeProduct } from '~/api';

import { UserContext } from '~/contexts';
import { CIconButton } from '~/components';
import { getIcon } from '~/utils';
import { getItemAllowedQuantity, getItemPrice } from '~/helpers';

export type BasketItemProps = {
  item: Item;
  stripeProduct: StripeProduct | undefined;
  optionId: ItemOptionId;
};

const BasketItem = ({ item, stripeProduct, optionId }: BasketItemProps) => {
  const {
    user: { basket },
    addItemToBasket,
    removeItemFromBasket,
  } = React.useContext(UserContext);

  const smMatch = useMediaQuery<any>(theme => theme.breakpoints.down('sm'));

  const basketItem = basket.items[item.id];

  const itemAllowedQuantity = stripeProduct?.quantity ?? getItemAllowedQuantity(item, optionId);
  const itemPrice = (getItemPrice(item, optionId) * basketItem[optionId]).toFixed(2);

  const inStockElement = (
    <Typography variant="caption" color="primary.dark" fontWeight="500" sx={{ userSelect: 'none' }}>
      In Stock: {itemAllowedQuantity}
    </Typography>
  );

  return (
    <Paper
      key={item.id}
      sx={{
        padding: 2,
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        width="100%"
        height="100%"
        overflow="hidden"
      >
        <RouterLink to={`/item/${item.id}`}>
          <img
            src={item.images[0].src}
            alt={item.images[0].alt}
            style={{ objectFit: 'cover', height: '100%', maxWidth: '80px', maxHeight: '70px' }}
          />
        </RouterLink>

        <Box flexGrow={1} order={{ xs: -1, sm: 0 }}>
          <Typography
            variant="subtitle2"
            component="div"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {item.title}

            {optionId !== 'undefined' && (
              <Chip
                size="small"
                color="info"
                label={item.options[optionId].name}
                sx={{ marginLeft: 1 }}
              />
            )}
          </Typography>

          <Typography variant={'body2'} display={{ xs: 'none', sm: 'block' }}>
            {item.subtitle}
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="center"
        spacing={1}
        flexShrink={0}
      >
        <Typography variant="subtitle1" flexShrink={0}>
          {itemPrice} £
        </Typography>

        {smMatch && inStockElement}
      </Stack>

      <Stack direction="column" alignItems="center" spacing={1}>
        <ButtonGroup
          size="small"
          orientation={smMatch ? 'vertical' : 'horizontal'}
          aria-label="Quantity"
        >
          <Button
            disabled={basketItem[optionId] === 1}
            onClick={() => removeItemFromBasket(item.id, optionId)}
          >
            -
          </Button>

          <Button disabled>{basketItem[optionId]}</Button>

          <Button
            disabled={basketItem[optionId] >= itemAllowedQuantity}
            onClick={() => addItemToBasket(item.id, optionId)}
          >
            +
          </Button>
        </ButtonGroup>

        {!smMatch && inStockElement}
      </Stack>

      <Box display={{ xs: 'none', sm: 'flex' }} alignItems="center">
        <CIconButton
          onClick={() => removeItemFromBasket(item.id, optionId, true)}
          icon={getIcon('deleteForever')}
        />
      </Box>
    </Paper>
  );
};

export default BasketItem;
