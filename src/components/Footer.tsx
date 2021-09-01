import React from 'react';
import {
  Box,
  Grid,
  Container,
  Link,
  Typography,
  List,
  ListItem,
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
        padding: theme.spacing(1)
      }}
    >
      <Container maxWidth={'lg'}>
        <Grid spacing={2} container>
          <Grid xs={12} sm={3} item>
          </Grid>
          <Grid xs={12} sm={3} item>
          </Grid>
          <Grid xs={12} sm={3} item>
          </Grid>
          <Grid xs={12} sm={3} item>
            <List disablePadding>
              <ListItem disablePadding>
                <Typography
                  variant={'overline'}
                  color={'white'}
                  component={'div'}
                >
                  Контакты
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <Typography
                  variant={'body2'}
                  component={'div'}
                  color={'white'}
                >
                  Украина, Киев
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <Typography
                  variant={'body2'}
                  component={Link}
                  href={'tel:+38(099) 441-57-77'}
                  color={'white'}
                >
                  Ph.: 099-441-57-77
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <Typography
                  variant={'body2'}
                  component={Link}
                  href={'mailto:m.aliynik@gmail.com'}
                  color={'white'}
                >
                  E-mail: m.aliynik@gmail.com
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Box textAlign={'center'}>
          <Typography
            variant={'body2'}
            component={'div'}
            fontSize={12}
          >
            Electro Fun 2021
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
