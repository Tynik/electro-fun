import React from 'react';
import { Grid, Typography } from '@mui/material';

export const ReturnPolicyPage = () => {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Typography variant={'h5'}>Return and Refund Policy</Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'body1'}>
          At <strong>SmartStream Electronics</strong>, we strive to provide you with the best
          products and service. If you are not completely satisfied with your purchase, we offer a
          hassle-free return and refund policy to ensure your satisfaction.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Eligibility</Typography>

        <Typography variant={'body1'}>
          To be eligible for a return, the product must be in its original condition, unused, and in
          its original packaging. Returns must be initiated within 30 days of the delivery date.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Return Process</Typography>

        <Typography variant={'body1'}>
          Please contact our customer support team at m.aliynik@gmail.com to begin the return
          process. Provide your order details and the reason for the return. Once your return is
          approved, you can create a return label with our address:{' '}
          <strong>SmartStream Electronics 89 Springfield Park Road, Chelmsford CM2 6ED</strong>
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Return Shipping</Typography>

        <Typography variant={'body1'}>
          Customers are responsible for the return shipping costs, except in cases of our error or a
          defective product.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Refunds</Typography>

        <Typography variant={'body1'}>
          After receiving and inspecting the returned item, we will notify you about the status of
          your refund. If the return meets our eligibility criteria, we will process your refund to
          the original payment method within 7 days.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Exchanges</Typography>

        <Typography variant={'body1'}>
          If you wish to exchange the product for another item, please indicate it when initiating
          the return. We will assist you with the exchange process and help you select the new
          product.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'subtitle1'}>Please Note</Typography>

        <Typography variant={'body1'}>
          We reserve the right to assess the condition of the returned item and make a determination
          on eligibility for a refund or exchange. Refunds may take a few days to appear in your
          account, depending on your bank or payment provider. If you have any questions or concerns
          regarding our return and refund policy, please don't hesitate to reach out to our customer
          support team. We are here to assist you and ensure your shopping experience with{' '}
          <strong>SmartStream Electronics</strong> is exceptional. We value your satisfaction and
          look forward to serving you again soon!
        </Typography>
      </Grid>
    </Grid>
  );
};
