import React from 'react';
import { FormLabel, RadioGroup, FormControlLabel, Radio, Chip, FormControl } from '@mui/material';

import type { Item } from '~/types';

import { UserContext } from '~/contexts';
import { useQueryParams } from '~/utils/router';
import { getItemDefaultOption } from '~/helpers';
import { useNavigate } from 'react-router-dom';

export type ItemInfoOptionsProps = {
  item: Item;
};

export const ItemInfoOptions = ({ item }: ItemInfoOptionsProps) => {
  const navigate = useNavigate();

  const { optionId: selectedItemOptionId } = useQueryParams();

  const {
    user: { basket },
  } = React.useContext(UserContext);

  const itemOptionsInBasket = basket.items[item.id] || {};

  const defaultItemOptionId = React.useMemo(
    () => selectedItemOptionId || getItemDefaultOption(item),
    []
  );

  const onSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryParams = new URLSearchParams({
      optionId: (e.target as HTMLInputElement).value,
    });

    navigate(`?${queryParams}`, { replace: true });
  };

  return (
    <FormControl component={'fieldset'}>
      <FormLabel component={'legend'}>Options</FormLabel>

      <RadioGroup
        defaultValue={defaultItemOptionId}
        aria-label={'option'}
        name={'radio-buttons-group'}
        onChange={onSelectOption}
      >
        {Object.keys(item.options).map(optionId => (
          <FormControlLabel
            key={optionId}
            value={optionId}
            label={
              <>
                {item.options[optionId].name}

                {itemOptionsInBasket[optionId] && (
                  <Chip
                    size={'small'}
                    label={`in cart x${itemOptionsInBasket[optionId]}`}
                    color={'info'}
                    sx={{ marginLeft: 1 }}
                  />
                )}
              </>
            }
            control={<Radio size={'small'} sx={{ padding: 1 }} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
