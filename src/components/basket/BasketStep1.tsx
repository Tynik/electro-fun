import React from 'react';
import { Button, Grid, Alert, Stack } from '@mui/material';

import type { Product } from '~/types';
import type { StripeProduct } from '~/api';

import { UserContext } from '~/contexts';
import { BasketItem } from '~/components';
import { getIcon } from '~/utils';

export type BasketStep1Props = {
  isActive: boolean;
  items: Product[];
  stripeProducts: StripeProduct[] | undefined;
  onNext: () => void;
};

const BasketStep1 = ({ isActive, items, stripeProducts, onNext }: BasketStep1Props) => {
  const {
    user: { basket },
    clearBasket,
  } = React.useContext(UserContext);

  if (!isActive) {
    return null;
  }

  return (
    <>
      {!items.length && (
        <Grid item>
          <Alert severity={'info'}>Cart is empty</Alert>
        </Grid>
      )}

      {items.map(item =>
        Object.keys(basket.products[item.id] || {}).map(optionId => (
          <Grid key={`${item.id}-${optionId}`} item>
            <BasketItem
              product={item}
              stripeProduct={stripeProducts?.find(
                stripeProduct => stripeProduct.id === item.stripeProductId,
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
            disabled={!items.length}
            startIcon={getIcon('deleteForever')}
            variant={'outlined'}
          >
            Clear
          </Button>

          <Button
            onClick={onNext}
            disabled={!items.length}
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
