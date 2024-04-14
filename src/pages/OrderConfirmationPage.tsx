import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Grid } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

import { confirmOrder } from '~/api';
import { useCurrentUser } from '~/providers';
import { Loader } from '~/components';

export const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sessionId = new URLSearchParams(location.search).get('sessionId');

  const { clearBasket } = useCurrentUser();

  const {
    data: orderConfirmationResult,
    isFetching: isOrderConfirmationResultFetching,
    isError: isOrderConfirmationResultError,
  } = useQuery(['confirm-order', sessionId], () => confirmOrder(sessionId!), {
    enabled: Boolean(sessionId),
  });

  const isOrderConfirmationError = orderConfirmationResult?.error ?? false;

  useEffect(() => {
    if (orderConfirmationResult && !isOrderConfirmationResultError && !isOrderConfirmationError) {
      clearBasket();
    }
  }, [orderConfirmationResult, isOrderConfirmationResultError]);

  if (isOrderConfirmationResultFetching) {
    return <Loader />;
  }

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        {isOrderConfirmationResultError && <Alert severity="error">Something went wrong</Alert>}

        {isOrderConfirmationError && (
          <Alert severity="warning">The payment was not successful or has been canceled</Alert>
        )}

        {orderConfirmationResult?.customer && (
          <Alert severity="info">
            You successfully placed the order{' '}
            <strong>{orderConfirmationResult.customer.name}</strong>. We will deliver your items as
            soon as possible. Thank you, and have a great day!
          </Alert>
        )}
      </Grid>

      <Grid xs={12} textAlign="center" item>
        <Button onClick={() => navigate('/')} startIcon={<HomeIcon />} variant={'outlined'}>
          Home Page
        </Button>
      </Grid>
    </Grid>
  );
};
