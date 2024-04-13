import React from 'react';
import { FormLabel, RadioGroup, FormControlLabel, Radio, Chip, FormControl } from '@mui/material';

import type { Product } from '~/types';

import { UserContext } from '~/contexts';
import { useQueryParams } from '~/utils/router';
import { getProductDefaultOption } from '~/helpers';
import { useNavigate } from 'react-router-dom';

export type ProductInfoOptionsProps = {
  product: Product;
};

export const ProductInfoOptions = ({ product }: ProductInfoOptionsProps) => {
  const navigate = useNavigate();

  const { optionId: selectedProductOptionId } = useQueryParams();

  const {
    user: { basket },
  } = React.useContext(UserContext);

  const productOptionsInBasket = basket.products[product.id] || {};

  const defaultProductOptionId = React.useMemo(
    () => selectedProductOptionId || getProductDefaultOption(product),
    [],
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
        defaultValue={defaultProductOptionId}
        aria-label={'option'}
        name={'radio-buttons-group'}
        onChange={onSelectOption}
      >
        {Object.keys(product.options).map(optionId => (
          <FormControlLabel
            key={optionId}
            value={optionId}
            label={
              <>
                {product.options[optionId].name}

                {productOptionsInBasket[optionId] && (
                  <Chip
                    size={'small'}
                    label={`in cart x${productOptionsInBasket[optionId]}`}
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
