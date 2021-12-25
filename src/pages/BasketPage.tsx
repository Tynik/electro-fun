import React from 'react';
import {
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core';

import { DbContext, UserContext } from '../contexts';
import {
  BackButton,
  Loader,
  BasketStep1,
  BasketStep2
} from '../components';
import { useJsonDbSearch } from '../hooks';

export type BasketPageProps = {}

export const BasketPage = (props: BasketPageProps) => {
  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems: items } = useJsonDbSearch(db, loadNextDbPart);

  const [step, setStep] = React.useState<number>(0);

  const {
    user: { basket }
  } = React.useContext(UserContext);

  React.useEffect(() => {
    setStep(0);
    search({ ids: Object.keys(basket.items) });
  }, [basket.items]);

  const totalPrice = React.useMemo(() =>
      items?.reduce((totalPrice, item) =>
        totalPrice + item.price * basket.items[item.id], 0) || 0,
    [items]
  );

  if (items === null) {
    return <Loader/>;
  }

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <BackButton/>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'h5'}>
          Корзина
        </Typography>
      </Grid>

      <Grid spacing={2} item container>
        <Grid xs={12} item>
          <Grid xs={9} item>
            <Stepper activeStep={step}>
              <Step>
                <StepLabel>Товары</StepLabel>
              </Step>
              <Step>
                <StepLabel>Детали доставки</StepLabel>
              </Step>
            </Stepper>
          </Grid>
        </Grid>

        <Grid xs={12} spacing={2} container item>
          <Grid
            xs={9}
            spacing={2}
            direction={'column'}
            container
            item
          >
            {step === 0 && (
              <BasketStep1
                items={items}
                onNext={() => setStep(step + 1)}
              />
            )}

            {step === 1 && (
              <BasketStep2
                items={items}
                totalPrice={totalPrice}
                onBefore={() => setStep(step - 1)}
              />
            )}
          </Grid>

          <Grid
            xs={3}
            alignContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            container
            item
          >
            <Grid item>
              <Typography
                variant={'overline'}
                component={'div'}
              >
                Общая сумма заказа:
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant={'h5'}
                component={'div'}
              >
                {totalPrice.toFixed(2)} UAH
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
