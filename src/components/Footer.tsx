import React from 'react';
import { Box, Grid, Container, Link, Typography, List, ListItem } from '@mui/material';

import { DbContext } from '~/contexts';
import { InternalLink } from '~/components';

export const Footer = () => {
  const { db } = React.useContext(DbContext);

  return (
    <Box
      component={'footer'}
      sx={{
        marginTop: 'auto',
        backgroundColor: 'info.main',
        color: 'white',
        padding: 1,
      }}
    >
      <Container maxWidth={'lg'}>
        <Grid spacing={2} container>
          <Grid xs={12} sm={3} item>
            <List disablePadding>
              <ListItem disablePadding>
                <Typography
                  variant={'overline'}
                  color={'white'}
                  component={'div'}
                  sx={{
                    width: { xs: '100%' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Links
                </Typography>
              </ListItem>

              <ListItem disablePadding>
                <Typography
                  to="return-policy"
                  variant={'body2'}
                  component={InternalLink}
                  color={'white'}
                  sx={{
                    display: 'inline-block',
                    width: { xs: '100%' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Return Policy
                </Typography>
              </ListItem>

              <ListItem disablePadding>
                <Typography
                  to="privacy-policy"
                  variant={'body2'}
                  component={InternalLink}
                  color={'white'}
                  sx={{
                    display: 'inline-block',
                    width: { xs: '100%' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Privacy Policy
                </Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid xs={12} sm={3} item></Grid>

          <Grid xs={12} sm={3} item></Grid>

          <Grid xs={12} sm={3} item>
            <List disablePadding>
              <ListItem disablePadding>
                <Typography
                  variant={'overline'}
                  color={'white'}
                  component={'div'}
                  sx={{
                    width: { xs: '100%' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Contact Us
                </Typography>
              </ListItem>

              <ListItem disablePadding>
                <Typography
                  variant={'body2'}
                  component={'div'}
                  color={'white'}
                  sx={{
                    width: { xs: '100%' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  UK, Chelmsford
                </Typography>
              </ListItem>

              <ListItem disablePadding>
                <Typography
                  variant={'body2'}
                  component={Link}
                  href={'mailto:m.aliynik@gmail.com'}
                  color={'white'}
                  sx={{
                    width: { xs: '100%' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  E-mail: m.aliynik@gmail.com
                </Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid xs={12} textAlign={'center'} item>
            <Typography variant={'body2'} component={'div'} fontSize={12}>
              {db.footer.bottom}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
