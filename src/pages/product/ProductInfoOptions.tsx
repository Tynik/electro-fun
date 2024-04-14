import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLabel, RadioGroup, FormControlLabel, Radio, Chip, FormControl } from '@mui/material';

import type { Product } from '~/types';

import { useCurrentUser } from '~/providers';
import { useQueryParams } from '~/utils/router';
import { getProductDefaultOption } from '~/helpers';

export type ProductInfoOptionsProps = {
  product: Product;
};

export const ProductInfoOptions = ({ product }: ProductInfoOptionsProps) => {
  const navigate = useNavigate();

  const { optionId: selectedProductOptionId } = useQueryParams();

  const {
    user: { basket },
  } = useCurrentUser();

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

  const productOptions = product.options ?? {};

  return (
    <FormControl component={'fieldset'}>
      <FormLabel component={'legend'}>Options</FormLabel>

      <RadioGroup
        defaultValue={defaultProductOptionId}
        aria-label={'option'}
        name={'radio-buttons-group'}
        onChange={onSelectOption}
      >
        {Object.keys(productOptions).map(optionId => (
          <FormControlLabel
            key={optionId}
            value={optionId}
            label={
              <>
                {productOptions[optionId].name}

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
