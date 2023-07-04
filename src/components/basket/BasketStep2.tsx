import React from 'react';
import { Button, Grid, Stack, Box, Alert, TextField } from '@mui/material';

import type { Item } from '~/types';

import { AppContext, DbContext, UserContext } from '~/contexts';
import { checkoutRequest } from '~/api';
import { getIcon } from '~/utils';

export type BasketStep2Props = {
  isActive: boolean;
  items: Item[];
  totalPrice: number;
  onBefore: () => void;
};

const BasketStep2 = ({ isActive, items, onBefore }: BasketStep2Props) => {
  const {
    user: { basket },
    clearBasket,
  } = React.useContext(UserContext);

  const { db } = React.useContext(DbContext);
  const { addNotification } = React.useContext(AppContext);

  const [fullName, setFullName] = React.useState<string>(null);
  const [phone, setPhone] = React.useState<string>(null);
  const [deliveryAddress, setDeliveryAddress] = React.useState<string>(null);
  const [note, setNote] = React.useState<string>(null);

  const makeOrder = async () => {
    try {
      // const itemsContent = items.map(item =>
      //     Object.keys(basket.items[item.id]).map(optionId =>
      //         `${basket.items[item.id][optionId]} x ${db.siteURL}/item/${item.id}?${new URLSearchParams({
      //           optionId
      //         })}`
      //     ).join('\n')
      // );

      const { data } = await checkoutRequest({
        items: Object.keys(basket.items).map(itemId => ({
          priceId: items[itemId].priceId,
          quantity: 1,
        })),
        fullName,
        phone,
        deliveryAddress,
        note,
      });
      // clearBasket();

      window.open(data.url);

      // addNotification('You have successfully placed an order.', {
      //   timeout: 5000,
      // });
    } catch (e) {
      console.log(e);

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
              value={fullName || ''}
              onChange={e => setFullName(e.target.value)}
              label={'Full Name'}
              variant={'outlined'}
              size={'small'}
              error={fullName === ''}
              helperText={fullName === '' && 'Full Name is required'}
              fullWidth
            />

            <TextField
              value={phone || ''}
              onChange={e => setPhone(e.target.value)}
              label={'Ph. 079XXXXXXXX'}
              variant={'outlined'}
              size={'small'}
              error={phone === ''}
              helperText={phone === '' && 'Phone is required'}
              fullWidth
            />

            <TextField
              value={deliveryAddress || ''}
              onChange={e => setDeliveryAddress(e.target.value)}
              label={'Delivery Address'}
              variant={'outlined'}
              size={'small'}
              error={deliveryAddress === ''}
              helperText={deliveryAddress === '' && 'Delivery Address is required'}
              fullWidth
            />

            <TextField
              value={note || ''}
              onChange={e => setNote(e.target.value)}
              label={'Note'}
              variant={'outlined'}
              size={'small'}
              multiline
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>

      <Grid item>
        <Alert
          severity={'info'}
          sx={{
            alignItems: 'center',
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <p>...</p>
        </Alert>
      </Grid>

      <Grid item>
        <Stack spacing={2} direction={'row'} justifyContent={'space-between'}>
          <Button onClick={onBefore} startIcon={getIcon('navigateBefore')} variant={'outlined'}>
            Back
          </Button>

          <Button
            onClick={makeOrder}
            disabled={!fullName || !phone || !deliveryAddress}
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
