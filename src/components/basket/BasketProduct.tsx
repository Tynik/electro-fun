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

import type { Product, ProductOptionId } from '~/types';
import type { StripeProduct } from '~/api';

import { useCurrentUser } from '~/providers';
import { CIconButton } from '~/components';
import { getIcon } from '~/utils';
import { getProductAllowedQuantity, getProductPrice } from '~/helpers';

export type BasketProductProps = {
  product: Product;
  stripeProduct: StripeProduct | undefined;
  optionId: ProductOptionId;
};

export const BasketProduct = ({ product, stripeProduct, optionId }: BasketProductProps) => {
  const {
    user: { basket },
    addProductToBasket,
    removeProductFromBasket,
  } = useCurrentUser();

  const smMatch = useMediaQuery<any>(theme => theme.breakpoints.down('sm'));

  const basketProduct = basket.products[product.id];

  const productAllowedQuantity = getProductAllowedQuantity(stripeProduct, product, optionId);
  const productPrice = (
    getProductPrice(stripeProduct, product, optionId) * basketProduct[optionId]
  ).toFixed(2);

  const inStockElement = (
    <Typography variant="caption" color="primary.dark" fontWeight="500" sx={{ userSelect: 'none' }}>
      In Stock: {productAllowedQuantity}
    </Typography>
  );

  const productImage =
    product.images.find(image => image.optionId === optionId) ?? product.images[0];

  return (
    <Paper
      key={product.id}
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
        <RouterLink to={`/item/${product.id}`}>
          <img
            src={
              productImage.src.startsWith('http')
                ? productImage.src
                : `/assets/photos/${productImage.src}`
            }
            alt={productImage.alt}
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
            {product.title}

            {optionId && product.options?.[optionId] && (
              <Chip
                size="small"
                color="info"
                label={product.options[optionId].name}
                sx={{ marginLeft: 1 }}
              />
            )}
          </Typography>

          <Typography variant="body2" display={{ xs: 'none', sm: 'block' }}>
            {product.subtitle}
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
          {productPrice} £
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
            disabled={basketProduct[optionId] === 1}
            onClick={() => removeProductFromBasket(product.id, optionId)}
          >
            -
          </Button>

          <Button disabled>{basketProduct[optionId]}</Button>

          <Button
            disabled={basketProduct[optionId] >= productAllowedQuantity}
            onClick={() => addProductToBasket(product.id, optionId)}
          >
            +
          </Button>
        </ButtonGroup>

        {!smMatch && inStockElement}
      </Stack>

      <Box display={{ xs: 'none', sm: 'flex' }} alignItems="center">
        <CIconButton
          onClick={() => removeProductFromBasket(product.id, optionId, true)}
          icon={getIcon('deleteForever')}
        />
      </Box>
    </Paper>
  );
};
