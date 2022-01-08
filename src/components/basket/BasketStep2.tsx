import React from 'react';
import {
  Button,
  Grid,
  Stack,
  Box,
  TextField
} from '@mui/material';

import type { ItemT } from '~/types';

import { AppContext, UserContext } from '~/contexts';
import { netlifyMakeOrder } from '~/api';
import { getIcon } from '~/utils';

export type BasketStep2Props = {
  isActive: boolean
  items: ItemT[]
  totalPrice: number
  onBefore: () => void
}

const BasketStep2 = ({ isActive, items, totalPrice, onBefore }: BasketStep2Props) => {
  const {
    user: { basket },
    clearBasket
  } = React.useContext(UserContext);

  const { addNotification } = React.useContext(AppContext);

  const [fullname, setFullname] = React.useState<string>(null);
  const [phone, setPhone] = React.useState<string>(null);
  const [address, setAddress] = React.useState<string>(null);
  const [comment, setComment] = React.useState<string>(null);

  const makeOrder = async () => {
    try {
      const itemsContent = items.map(item =>
        Object.keys(basket.items[item.id]).map(optionId =>
          `${basket.items[item.id][optionId]} x https://smart-home-tech.com.ua/item/${item.id}?${new URLSearchParams({
            optionId
          })}`
        ).join('\n')
      );

      await netlifyMakeOrder({
        items: itemsContent,
        fullname,
        phone,
        address,
        comment,
        totalPrice
      });
      clearBasket();

      addNotification('Вы успешно оформили заказ. Мы Вам перезвоним!', {
        timeout: 5000
      });
    } catch (e) {
      addNotification('Ошибка при оформлении заказа. Попробуйте позже', {
        severity: 'error'
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
              '& .MuiTextField-root': { m: 1 }
            }}
            noValidate
          >
            <TextField
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
              label={'ФИО'}
              variant={'outlined'}
              size={'small'}
              error={fullname === ''}
              helperText={fullname === '' && 'ФИО является обязательным'}
              fullWidth
            />

            <TextField
              value={phone || ''}
              onChange={(e) => setPhone(e.target.value)}
              label={'Тел.'}
              variant={'outlined'}
              size={'small'}
              error={phone === ''}
              helperText={phone === '' && 'Телефон является обязательным'}
              fullWidth
            />

            <TextField
              value={address || ''}
              onChange={(e) => setAddress(e.target.value)}
              label={'Адрес'}
              variant={'outlined'}
              size={'small'}
              error={address === ''}
              helperText={address === '' && 'Адрес является обязательным'}
              fullWidth
            />

            <TextField
              value={comment || ''}
              onChange={(e) => setComment(e.target.value)}
              label={'Комментарий'}
              variant={'outlined'}
              size={'small'}
              multiline
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>

      <Grid item>
        <Stack
          spacing={2}
          direction={'row'}
          justifyContent={'space-between'}
        >
          <Button
            onClick={onBefore}
            startIcon={getIcon('navigateBefore')}
            variant={'outlined'}
          >
            Назад
          </Button>

          <Button
            onClick={makeOrder}
            disabled={!fullname || !phone || !address}
            startIcon={getIcon('money')}
            color={'success'}
            variant={'contained'}
          >
            Оформить
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default BasketStep2;
