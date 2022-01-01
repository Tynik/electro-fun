import React from 'react';
import { Grid, Alert, Stack } from '@mui/material';

import type { ItemT } from '../../types';

import { UserContext } from '../../contexts';
import { BasketItem, CButton } from '../../components';
import { getIcon } from '../../utils';

export type BasketStep1Props = {
  isActive: boolean
  items: ItemT[]
  onNext: () => void
}

const BasketStep1 = ({ isActive, items, onNext }: BasketStep1Props) => {
  const {
    user: { basket },
    clearBasket
  } = React.useContext(UserContext);

  if (!isActive) {
    return null;
  }

  return (
    <>
      {!items.length && (
        <Grid item>
          <Alert severity={'info'}>
            Корзина пуста
          </Alert>
        </Grid>
      )}

      {items.map(item => Object.keys(basket.items[item.id] || {}).map(optionId =>
        <Grid key={`${item.id}-${optionId}`} item>
          <BasketItem item={item} optionId={optionId}/>
        </Grid>
      ))}

      <Grid item>
        <Stack
          spacing={2}
          direction={'row'}
          sx={{ justifyContent: 'right' }}
        >
          <CButton
            onClick={clearBasket}
            disabled={!items.length}
            startIcon={getIcon('deleteForever')}
            variant={'outlined'}
          >
            Очистить
          </CButton>

          <CButton
            onClick={onNext}
            disabled={!items.length}
            startIcon={getIcon('navigateNext')}
            color={'success'}
            variant={'contained'}
          >
            Далее
          </CButton>
        </Stack>
      </Grid>
    </>
  );
};

export default BasketStep1;
