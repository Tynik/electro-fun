import React from 'react';
import {
  Grid,
  Button,
  Alert,
  Stack,
} from '@material-ui/core';

import type { ItemT } from '../../types';

import { UserContext } from '../../contexts';
import { BasketItem } from '../../components';
import { getIcon } from '../../utils';

export type BasketStep1Props = {
  items: ItemT[]
  onNext: () => void
}

const BasketStep1 = ({ items, onNext }: BasketStep1Props) => {
  const {
    clearBasket
  } = React.useContext(UserContext);

  return (
    <>
      {!items.length && (
        <Grid item>
          <Alert severity={'info'}>
            Корзина пуста
          </Alert>
        </Grid>
      )}

      {items.map(item => (
        <Grid key={item.id} item>
          <BasketItem item={item}/>
        </Grid>
      ))}

      <Grid item>
        <Stack
          spacing={2}
          direction={'row'}
          sx={{ justifyContent: 'right' }}
        >
          <Button
            onClick={clearBasket}
            disabled={!items.length}
            startIcon={getIcon('deleteForever')}
            variant={'outlined'}
          >
            Очистить
          </Button>

          <Button
            onClick={onNext}
            disabled={!items.length}
            startIcon={getIcon('navigateNext')}
            color={'success'}
            variant={'contained'}
          >
            Далее
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default BasketStep1;
