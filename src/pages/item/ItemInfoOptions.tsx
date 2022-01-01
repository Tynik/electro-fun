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

import type { ItemT, ItemOptionsT } from '../../types';

import { UserContext } from '../../contexts';
import { useQueryParams } from '../../utils/router';

export type ItemInfoOptionsProps = {
  item: ItemT
  options: ItemOptionsT
}

export const ItemInfoOptions = ({ item, options }: ItemInfoOptionsProps) => {
  const history = useHistory();

  const { optionId: selectedOptionId } = useQueryParams();

  const {
    user: { basket },
  } = React.useContext(UserContext);

  const itemInBasket = basket.items[item.id] || {};

  const defaultOption = React.useMemo(() =>
      Object.keys(options).find(optionId =>
        selectedOptionId
          ? optionId === selectedOptionId
          : options[optionId].default
      ),
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
        defaultValue={defaultOption}
        aria-label={'option'}
        name={'radio-buttons-group'}
        onChange={onSelectOption}
      >
        {Object.keys(options).map(optionId => (
          <FormControlLabel
            key={optionId}
            value={optionId}
            label={(
              <>
                {options[optionId].name}
                {itemInBasket[optionId] && (
                  <Chip
                    size={'small'}
                    label={`уже в корзине x${itemInBasket[optionId]}`}
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
