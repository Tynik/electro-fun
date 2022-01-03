import React from 'react';
import { useHistory } from 'react-router';
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  FormControl
} from '@mui/material';

import type { ItemT } from '../../types';

import { UserContext } from '../../contexts';
import { useQueryParams } from '../../utils/router';
import { getItemDefaultOption } from '../../helpers';

export type ItemInfoOptionsProps = {
  item: ItemT
}

export const ItemInfoOptions = ({ item }: ItemInfoOptionsProps) => {
  const history = useHistory();

  const { optionId: selectedItemOptionId } = useQueryParams();

  const {
    user: { basket },
  } = React.useContext(UserContext);

  const itemOptionsInBasket = basket.items[item.id] || {};

  const itemOptionId = React.useMemo(() =>
    selectedItemOptionId || getItemDefaultOption(item),
    []
  );

  const onSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryParams = new URLSearchParams({
      optionId: (e.target as HTMLInputElement).value
    });
    history.replace(`?${queryParams}`);
  };

  return (
    <FormControl component={'fieldset'}>
      <FormLabel component={'legend'}>
        Варианты
      </FormLabel>

      <RadioGroup
        defaultValue={itemOptionId}
        aria-label={'option'}
        name={'radio-buttons-group'}
        onChange={onSelectOption}
      >
        {Object.keys(item.options).map(optionId => (
          <FormControlLabel
            key={optionId}
            value={optionId}
            label={(
              <>
                {item.options[optionId].name}

                {itemOptionsInBasket[optionId] && (
                  <Chip
                    size={'small'}
                    label={`в корзине x${itemOptionsInBasket[optionId]}`}
                    color={'info'}
                    sx={{ marginLeft: 1 }}
                  />
                )}
              </>
            )}
            control={<Radio size={'small'} sx={{ padding: 1 }}/>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
