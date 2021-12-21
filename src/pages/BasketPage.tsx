import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Stack,
  Typography
} from '@material-ui/core';

import { DbContext, UserContext } from '../contexts';
import { netlifyMakeOrder } from '../api';
import { BackButton, CIconButton, Loader } from '../components';
import { getIcon } from '../utils';
import { useJsonDbSearch } from '../hooks';

export type BasketPageProps = {}

export const BasketPage = (props: BasketPageProps) => {
  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems: items } = useJsonDbSearch(db, loadNextDbPart);

  const {
    user: { basket },
    addItemToBasket,
    removeItemFromBasket,
    clearBasket
  } = React.useContext(UserContext);

  React.useEffect(() => {
    search({ ids: Object.keys(basket.items) });
  }, [basket.items]);

  const totalPrice = React.useMemo(() =>
      items?.reduce((totalPrice, item) =>
        totalPrice + item.price * basket.items[item.id], 0) || 0,
    [items]
  );

  const makeOrder = async () => {
    await netlifyMakeOrder({
      name: '',
      phone: '',
      items: items.map(item =>
        `${basket.items[item.id]} x https://smart-home-tech.com.ua/item/${item.id}`
      ),
      totalPrice
    });
  };

  if (items === null) {
    return <Loader/>;
  }

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <BackButton/>
      </Grid>

      <Grid xs={12} item>
        <Typography variant={'h5'}>
          Корзина
        </Typography>
      </Grid>

      {!items.length && (
        <Grid xs={12} item>
          <Alert severity={'info'}>
            Корзина пуста
          </Alert>
        </Grid>
      )}

      <Grid xs={12} md={9} item>
        <Grid spacing={2} container>
          {items.map(item => (
            <Grid key={item.id} xs={12} item>
              <Paper
                key={item.id}
                sx={{
                  padding: 2,
                  height: '100px',
                  display: 'flex',
                  gap: 2
                }}>
                <RouterLink to={`/item/${item.id}`} style={{ height: '100%' }}>
                  <img
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                </RouterLink>

                <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Typography variant={'subtitle2'} component={'div'}>
                    {item.title}
                  </Typography>

                  <Typography
                    variant={'body2'}
                    component={'div'}
                    display={{ xs: 'none', sm: 'block' }}
                  >
                    {item.subtitle}
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }}/>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ButtonGroup
                    size={'small'}
                    aria-label={'Кол-во'}
                  >
                    <Button
                      disabled={basket.items[item.id] === 1}
                      onClick={() => removeItemFromBasket(item.id)}
                    >
                      -
                    </Button>
                    <Button disabled>{basket.items[item.id]}</Button>
                    <Button onClick={() => addItemToBasket(item.id)}>+</Button>
                  </ButtonGroup>
                </Box>

                <Box sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center'
                }}>
                  <CIconButton
                    onClick={() => removeItemFromBasket(item.id, true)}
                    icon={getIcon('deleteForever')}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid xs={12} md={3} item>
        <Grid spacing={2} container>
          <Grid xs={12} sx={{ textAlign: 'right' }} item>
            <Typography
              variant={'subtitle1'}
              component={'div'}
            >
              Стоимость: {totalPrice}
            </Typography>
          </Grid>

          <Grid xs={12} item>
            <Stack
              direction={'column'}
              sx={{ justifyContent: 'right' }}
              spacing={2}
            >
              <Button
                onClick={makeOrder}
                disabled={!items.length}
                startIcon={getIcon('money')}
                color={'success'}
                variant={'contained'}
              >
                Оформить
              </Button>

              <Button
                onClick={clearBasket}
                disabled={!items.length}
                startIcon={getIcon('deleteForever')}
                variant={'outlined'}
              >
                Очистить
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
