import React from 'react';
import {
  Box,
  Grid,
  Container,
  useTheme
} from '@material-ui/core';

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component={'footer'}
      sx={{
        marginTop: 'auto',
        backgroundColor: theme.palette.info.main,
        color: 'white',
        padding: theme.spacing(2)
      }}
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
