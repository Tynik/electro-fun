import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Stack, Box, TextField } from '@mui/material';
import { useHoneyForm } from '@tynik/react-honey-form';

import type { Item } from '~/types';

import { AppContext, UserContext } from '~/contexts';
import { getIcon } from '~/utils';
import { type CheckoutItem, checkoutRequest } from '~/api';
import { getItemPriceId, getItemWeight } from '~/helpers';

type CheckoutFormData = {
  fullName: string;
  email: string;
  shippingCity: string;
  shippingAddress1: string;
  shippingPostcode: string;
  note: string;
};

export type BasketStep2Props = {
  isActive: boolean;
  items: Item[];
  totalPrice: number;
  onBefore: () => void;
};

const BasketStep2 = ({ isActive, items, onBefore }: BasketStep2Props) => {
  const navigate = useNavigate();

  const {
    user: { basket },
    clearBasket,
  } = React.useContext(UserContext);

  const { addNotification } = React.useContext(AppContext);

  const { formFields, formErrors, submitForm } = useHoneyForm<CheckoutFormData>({
    fields: {
      fullName: {
        required: true,
        value: '',
      },
      email: {
        type: 'email',
        required: true,
        value: '',
      },
      shippingCity: {
        required: true,
        value: '',
      },
      shippingAddress1: {
        required: true,
        value: '',
      },
      shippingPostcode: {
        required: true,
        value: '',
      },
      note: {},
    },
  });

  const makeOrder = async (formData: CheckoutFormData) => {
    try {
      const checkoutItems = items.reduce<CheckoutItem[]>((result, item) => {
        Object.keys(basket.items[item.id]).map(optionId => {
          result.push({
            priceId: getItemPriceId(item, optionId),
            weight: getItemWeight(item, optionId),
            quantity: basket.items[item.id][optionId],
          });
        });

        return result;
      }, []);

      const checkoutResponse = await checkoutRequest({
        items: checkoutItems,
        fullName: formData.fullName,
        email: formData.email,
        shippingCity: formData.shippingCity,
        shippingAddress1: formData.shippingAddress1,
        shippingPostcode: formData.shippingPostcode,
        note: formData.note,
      });

      navigate('/');

      clearBasket();

      window.open(checkoutResponse.url);

      addNotification('You have successfully placed an order.', {
        timeout: 5000,
      });
    } catch (e) {
      addNotification('Error when placing an order. Please, try later.', {
        severity: 'error',
      });
    }
  };

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Grid justifyContent={'center'} container item>
        <Grid xs={12} sm={6} item>
          <Box
            component={'form'}
            autoComplete={'off'}
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
          >
            <TextField
              {...formFields.fullName.props}
              error={formFields.fullName.errors.length > 0}
              helperText={formFields.fullName.errors[0]?.message}
              label={'Full Name'}
              variant={'outlined'}
              size={'small'}
              fullWidth
            />

            <TextField
              {...formFields.email.props}
              error={formFields.email.errors.length > 0}
              helperText={formFields.email.errors[0]?.message}
              label={'E-mail'}
              variant={'outlined'}
              size={'small'}
              fullWidth
            />

            <TextField
              value={'United Kingdom'}
              label={'Country'}
              variant={'outlined'}
              size={'small'}
              disabled
              fullWidth
            />

            <TextField
              {...formFields.shippingCity.props}
              error={formFields.shippingCity.errors.length > 0}
              helperText={formFields.shippingCity.errors[0]?.message}
              label={'City'}
              variant={'outlined'}
              size={'small'}
              fullWidth
            />

            <TextField
              {...formFields.shippingAddress1.props}
              error={formFields.shippingAddress1.errors.length > 0}
              helperText={formFields.shippingAddress1.errors[0]?.message}
              label={'Address 1'}
              variant={'outlined'}
              size={'small'}
              fullWidth
            />

            <TextField
              {...formFields.shippingPostcode.props}
              error={formFields.shippingPostcode.errors.length > 0}
              helperText={formFields.shippingPostcode.errors[0]?.message}
              label={'Postcode'}
              variant={'outlined'}
              size={'small'}
              fullWidth
            />

            <TextField
              {...formFields.note.props}
              error={formFields.note.errors.length > 0}
              helperText={formFields.note.errors[0]?.message}
              label={'Note'}
              variant={'outlined'}
              size={'small'}
              rows={3}
              multiline
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>

      {/*<Grid item>*/}
      {/*  <Alert*/}
      {/*    severity={'info'}*/}
      {/*    sx={{*/}
      {/*      alignItems: 'center',*/}
      {/*      paddingTop: 0,*/}
      {/*      paddingBottom: 0,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <p>...</p>*/}
      {/*  </Alert>*/}
      {/*</Grid>*/}

      <Grid item>
        <Stack spacing={2} direction={'row'} justifyContent={'space-between'}>
          <Button onClick={onBefore} startIcon={getIcon('navigateBefore')} variant={'outlined'}>
            Back
          </Button>

          <Button
            disabled={Object.keys(formErrors).length > 0}
            onClick={() => submitForm(makeOrder)}
            startIcon={getIcon('money')}
            color={'success'}
            variant={'contained'}
          >
            Checkout
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default BasketStep2;
