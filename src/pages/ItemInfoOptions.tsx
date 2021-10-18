import React from 'react';
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl
} from '@material-ui/core';

import { ItemOptionsT } from '../types';

export type ItemInfoOptionsProps = {
  options: ItemOptionsT
}

export const ItemInfoOptions = ({ options }: ItemInfoOptionsProps) => {
  const defaultOption = React.useMemo(() =>
    Object.keys(options).find(optionId => options[optionId].default),
    []
  );

  return (
    <FormControl component={'fieldset'}>
      <FormLabel component={'legend'}>Варианты</FormLabel>
      <RadioGroup
        defaultValue={defaultOption}
        aria-label={'option'}
        name={'radio-buttons-group'}
      >
        {Object.keys(options).map(optionId => (
          <FormControlLabel
            key={optionId}
            value={optionId}
            label={options[optionId].name}
            control={<Radio size={'small'} sx={{ padding: 1 }}/>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
