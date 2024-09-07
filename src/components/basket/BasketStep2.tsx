import React from 'react';
import { Button, Grid, Stack, Box, TextField } from '@mui/material';
import { useHoneyForm } from '@tynik/react-honey-form';

import type { CheckoutProductPayload } from '~/api';
import type { Product } from '~/types';

import { AppContext, useCurrentUser } from '~/providers';
import { getIcon } from '~/utils';
import { checkoutRequest } from '~/api';
import { getStripeProductPriceId, getProductWeight } from '~/helpers';

type CheckoutFormData = {
  fullName: string;
  phone: string;
  email: string;
  shippingCity: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingPostcode: string;
  note: string;
};

export type BasketStep2Props = {
  isActive: boolean;
  products: Product[];
  totalPrice: number;
  onBefore: () => void;
};

export const BasketStep2 = ({ isActive, products, onBefore }: BasketStep2Props) => {
  const {
    user: { basket },
  } = useCurrentUser();

  const { addNotification } = React.useContext(AppContext);

  const { formFields, formErrors, isFormSubmitting, submitForm } = useHoneyForm<CheckoutFormData>({
    fields: {
      fullName: {
        type: 'string',
        required: true,
      },
      phone: {
        type: 'string',
      },
      email: {
        type: 'email',
        required: true,
      },
      shippingCity: {
        type: 'string',
        required: true,
      },
      shippingAddress1: {
        type: 'string',
        required: true,
      },
      shippingAddress2: {
        type: 'string',
      },
      shippingPostcode: {
        type: 'string',
        required: true,
      },
      note: {
        type: 'string',
      },
    },
  });

  const makeOrder = async (formData: CheckoutFormData) => {
    try {
      const checkoutProductsPayload = products.reduce<CheckoutProductPayload[]>(
        (checkoutPayload, product) => {
          const basketProduct = basket.products[product.id];

          Object.keys(basketProduct).map(optionId => {
            checkoutPayload.push({
              priceId: getStripeProductPriceId(product, optionId),
              weight: getProductWeight(product, optionId),
              quantity: basketProduct[optionId],
            });
          });

          return checkoutPayload;
        },
        [],
      );

      const checkoutResponse = await checkoutRequest({
        products: checkoutProductsPayload,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        shippingCity: formData.shippingCity,
        shippingAddress1: formData.shippingAddress1,
        shippingAddress2: formData.shippingAddress2,
        shippingPostcode: formData.shippingPostcode,
        note: formData.note,
      });

      window.open(checkoutResponse.url, '_self');
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
      <Grid justifyContent="center" container item>
        <Grid xs={12} sm={6} item>
          <Box
            component="form"
            autoComplete="off"
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
          >
            <TextField
              value={formFields.fullName.props.value}
              error={formFields.fullName.errors.length > 0}
              helperText={formFields.fullName.errors[0]?.message}
              onChange={formFields.fullName.props.onChange}
              label="Full Name"
              variant="outlined"
              size="small"
              required
              fullWidth
            />

            <TextField
              value={formFields.phone.props.value}
              error={formFields.phone.errors.length > 0}
              helperText={formFields.phone.errors[0]?.message}
              onChange={formFields.phone.props.onChange}
              label="Phone"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              value={formFields.email.props.value}
              error={formFields.email.errors.length > 0}
              helperText={formFields.email.errors[0]?.message}
              onChange={formFields.email.props.onChange}
              label="E-mail"
              variant="outlined"
              size="small"
              required
              fullWidth
            />

            <TextField
              value="United Kingdom"
              label="Country"
              variant="outlined"
              size="small"
              required
              disabled
              fullWidth
            />

            <TextField
              value={formFields.shippingCity.props.value}
              error={formFields.shippingCity.errors.length > 0}
              helperText={formFields.shippingCity.errors[0]?.message}
              onChange={formFields.shippingCity.props.onChange}
              label="City"
              variant="outlined"
              size="small"
              required
              fullWidth
            />

            <TextField
              value={formFields.shippingAddress1.props.value}
              error={formFields.shippingAddress1.errors.length > 0}
              helperText={formFields.shippingAddress1.errors[0]?.message}
              onChange={formFields.shippingAddress1.props.onChange}
              label="Address 1"
              variant="outlined"
              size="small"
              required
              fullWidth
            />

            <TextField
              value={formFields.shippingAddress2.props.value}
              error={formFields.shippingAddress2.errors.length > 0}
              helperText={formFields.shippingAddress2.errors[0]?.message}
              onChange={formFields.shippingAddress2.props.onChange}
              label="Address 2"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              value={formFields.shippingPostcode.props.value}
              error={formFields.shippingPostcode.errors.length > 0}
              helperText={formFields.shippingPostcode.errors[0]?.message}
              onChange={formFields.shippingPostcode.props.onChange}
              label="Postcode"
              variant="outlined"
              size="small"
              required
              fullWidth
            />

            <TextField
              value={formFields.note.props.value}
              error={formFields.note.errors.length > 0}
              helperText={formFields.note.errors[0]?.message}
              onChange={formFields.note.props.onChange}
              label="Note"
              variant="outlined"
              size="small"
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
            disabled={isFormSubmitting || Object.keys(formErrors).length > 0}
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
