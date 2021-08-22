import React from 'react';
import {
  Box,
  Grid,
  Container
} from '@material-ui/core';

export const Footer = () => {
  return (
    <Box
      component={'footer'}
      bgcolor={'info.main'}
      color={'white'}
      padding={2}
    >
      <Container maxWidth={'lg'}>
        <Grid spacing={2} container>
          <Grid xs={12} sm={4} item>
          </Grid>
          <Grid xs={12} sm={4} textAlign={'center'} item>
            Electro Fun 2021
          </Grid>
          <Grid xs={12} sm={4} item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
