import React from 'react';
import { Button, Grid, Alert, Stack } from '@mui/material';

import type { Product } from '~/types';
import type { StripeProduct } from '~/api';

import { UserContext } from '~/contexts';
import { BasketItem } from '~/components';
import { getIcon } from '~/utils';

export type BasketStep1Props = {
  isActive: boolean;
  products: Product[];
  stripeProducts: StripeProduct[] | undefined;
  onNext: () => void;
};

const BasketStep1 = ({ isActive, products, stripeProducts, onNext }: BasketStep1Props) => {
  const {
    user: { basket },
    clearBasket,
  } = React.useContext(UserContext);

  if (!isActive) {
    return null;
  }

  return (
    <>
      {!products.length && (
        <Grid item>
          <Alert severity={'info'}>Cart is empty</Alert>
        </Grid>
      )}

      {products.map(product =>
        Object.keys(basket.products[product.id] || {}).map(optionId => (
          <Grid key={`${product.id}-${optionId}`} item>
            <BasketItem
              product={product}
              stripeProduct={stripeProducts?.find(
                stripeProduct => stripeProduct.id === product.stripeProductId,
              )}
              optionId={optionId}
            />
          </Grid>
        )),
      )}

      <Grid item>
        <Stack spacing={2} direction={'row'} sx={{ justifyContent: 'right' }}>
          <Button
            onClick={clearBasket}
            disabled={!products.length}
            startIcon={getIcon('deleteForever')}
            variant={'outlined'}
          >
            Clear
          </Button>

          <Button
            onClick={onNext}
            disabled={!products.length}
            startIcon={getIcon('navigateNext')}
            color={'success'}
            variant={'contained'}
          >
            Next
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default BasketStep1;
