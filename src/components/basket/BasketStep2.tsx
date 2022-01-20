import React from 'react';
import {
  Button,
  Grid,
  Stack,
  Box,
  Alert,
  TextField
} from '@mui/material';

import type { ItemT } from '~/types';

import { AppContext, DbContext, UserContext } from '~/contexts';
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

  const { db } = React.useContext(DbContext);
  const { addNotification } = React.useContext(AppContext);

  const [fullname, setFullname] = React.useState<string>(null);
  const [phone, setPhone] = React.useState<string>(null);
  const [deliveryAddress, setDeliveryAddress] = React.useState<string>(null);
  const [comment, setComment] = React.useState<string>(null);

  const makeOrder = async () => {
    try {
      const itemsContent = items.map(item =>
        Object.keys(basket.items[item.id]).map(optionId =>
          `${basket.items[item.id][optionId]} x ${db.siteURL}/item/${item.id}?${new URLSearchParams({
            optionId
          })}`
        ).join('\n')
      );

      await netlifyMakeOrder({
        items: itemsContent,
        fullname,
        phone,
        deliveryAddress,
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
              label={'Тел. (0XX)-XX-XXX-XX'}
              variant={'outlined'}
              size={'small'}
              error={phone === ''}
              helperText={phone === '' && 'Телефон является обязательным'}
              fullWidth
            />

            <TextField
              value={deliveryAddress || ''}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              label={'Адрес доставки'}
              variant={'outlined'}
              size={'small'}
              error={deliveryAddress === ''}
              helperText={deliveryAddress === '' && 'Адрес доставки является обязательным'}
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
        <Alert
          severity={'info'}
          sx={{
            alignItems: 'center',
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          <p>Доставка осуществляется службами доставки: Новая Почта или Meest. Доставка Meest обычно в 2 раза дольше чем
            через Новую Почту, но она дешевле.</p>
          <p>Вы можете заказать наложенным платежом или сразу оплатить полную стоимость заказа на карту.</p>
          <p>Если Вы выбрали наложенный платеж, то Вам нужно будет сделать предоплату доставки в размере 50
            грн. на карту и эта сумма будет отнята от общей суммы заказа. Сумма доставки может быть увеличена или
            снижена службой доставки. Точную сумму доставки Вы уже оплатите при получении товара.</p>
          <p>Иногда, Meest проводит акцию "доставка за 1 грн." - в этом случае доставка будет бесплатной.</p>
          <p>Доставка также может быть бесплатной или со сниженной стоимостью, когда вы покупаете большое количество
            товаров или акционный товар влияющий на стоимость доставки.</p>
          <p>Если сумма доставки была снижена при покупке акционного товара, то разница будет отнята от полной
            стоимости товара.</p>
          <p>Отправка заказа осуществляется в тот же день, если заказ был оплачен полностью или стоимость доставки
            переведена на карту до 15:00. В крайних случаях заказ может быть отправлен на следующий день, где про это мы
            Вас обязательно предупредим.</p>
          <p>Также, нет гарантии что служба доставки отправит заказ в этот же день, если он попал в отделение ближе к
            вечеру.</p>
          <p>Также Вы можете забрать заказ сами по адресу: г. Буча, ул. Героев Майдана 17.</p>
        </Alert>
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
            disabled={!fullname || !phone || !deliveryAddress}
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
