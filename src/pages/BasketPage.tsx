import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Grid, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { StripeProductId } from '~/types';

import { getStripeProducts } from '~/api';
import { DbContext, UserContext } from '~/contexts';
import { BackButton, Loader, BasketStep1, BasketStep2 } from '~/components';
import { useJsonDbSearch } from '~/hooks';
import { getProductPrice } from '~/helpers';
import { useQueryParams } from '~/utils';

export const BasketPage = () => {
  const navigate = useNavigate();
  const { step: queryStep } = useQueryParams();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundProducts: products } = useJsonDbSearch(db, loadNextDbPart);

  const {
    user: { basket },
  } = React.useContext(UserContext);

  const [step, setStep] = React.useState(+queryStep || 0);

  const stripeProductIds = useMemo(
    () =>
      (products
        ?.map(product => product.stripeProductId)
        .filter(stripeProductId => stripeProductId) ?? []) as StripeProductId[],
    [products],
  );

  const { data: stripeProducts, isFetching: isStripeProductsFetching } = useQuery(
    ['stripe-products'],
    () => getStripeProducts(stripeProductIds!),
    {
      enabled: Boolean(stripeProductIds?.length),
    },
  );

  React.useEffect(() => {
    navigate(`?step=${step}`, { replace: true });
  }, [step]);

  React.useEffect(() => {
    search({ ids: Object.keys(basket.products) });
  }, [basket.products]);

  const totalPrice = React.useMemo(
    () =>
      products?.reduce((totalPrice, product) => {
        const basketProduct = basket.products[product.id];

        const stripeProduct = stripeProducts?.find(
          stripeProduct => stripeProduct.id === product.stripeProductId,
        );

        const productsPrice = Object.keys(basketProduct).reduce(
          (productsTotalPrice, optionId) =>
            productsTotalPrice +
            getProductPrice(stripeProduct, product, optionId) * basketProduct[optionId],
          0,
        );

        return totalPrice + productsPrice;
      }, 0) ?? 0,
    [products, stripeProducts],
  );

  if (products === null || isStripeProductsFetching) {
    return <Loader />;
  }

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <BackButton />
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'h5'}>Cart</Typography>
      </Grid>

      <Grid spacing={2} item container>
        <Grid xs={12} item>
          <Grid xs={12} md={9} item>
            <Stepper activeStep={step}>
              <Step>
                <StepLabel>Items</StepLabel>
              </Step>
              <Step>
                <StepLabel>Shipping Details</StepLabel>
              </Step>
            </Stepper>
          </Grid>
        </Grid>

        <Grid xs={12} spacing={2} container item>
          <Grid xs={12} md={9} spacing={2} direction={'column'} container item>
            <BasketStep1
              isActive={step === 0}
              products={products}
              stripeProducts={stripeProducts}
              onNext={() => setStep(step + 1)}
            />

            <BasketStep2
              isActive={step === 1}
              products={products}
              totalPrice={totalPrice}
              onBefore={() => setStep(step - 1)}
            />
          </Grid>

          <Grid
            xs={12}
            md={3}
            alignContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            container
            item
          >
            <Grid item>
              <Typography variant={'overline'} component={'div'}>
                Total Amount:
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant={'h5'} component={'div'}>
                {totalPrice.toFixed(2)} £
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
