import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Stepper, Step, StepLabel } from '@mui/material';

import { DbContext, UserContext } from '~/contexts';
import { BackButton, Loader, BasketStep1, BasketStep2 } from '~/components';
import { useJsonDbSearch } from '~/hooks';
import { getItemPrice } from '~/helpers';
import { useQueryParams } from '~/utils';

export type BasketPageProps = {};

export const BasketPage = (props: BasketPageProps) => {
  const history = useHistory();
  const { step: queryStep } = useQueryParams();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems: items } = useJsonDbSearch(db, loadNextDbPart);

  const [step, setStep] = React.useState<number>(+queryStep || 0);

  const {
    user: { basket },
  } = React.useContext(UserContext);

  React.useEffect(() => {
    history.replace(`?step=${step}`);
  }, [step]);

  React.useEffect(() => {
    search({ ids: Object.keys(basket.items) });
  }, [basket.items]);

  const totalPrice = React.useMemo(
    () =>
      items?.reduce(
        (totalPrice, item) =>
          totalPrice +
          Object.keys(basket.items[item.id]).reduce(
            (price, optionId) =>
              price + getItemPrice(item, optionId) * basket.items[item.id][optionId],
            0
          ),
        0
      ) || 0,
    [items]
  );

  if (items === null) {
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
            <BasketStep1 isActive={step === 0} items={items} onNext={() => setStep(step + 1)} />

            <BasketStep2
              isActive={step === 1}
              items={items}
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
