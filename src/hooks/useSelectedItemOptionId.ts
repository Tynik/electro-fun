import React from 'react';

import type { ItemT } from '~/types';

import { useQueryParams } from '~/utils';
import { getItemDefaultOption } from '~/helpers';

export const useSelectedItemOptionId = (item: ItemT): string | null => {
  const { optionId: selectedItemOptionId } = useQueryParams();

  return React.useMemo(() =>
      item && (selectedItemOptionId || getItemDefaultOption(item)),
    [item, selectedItemOptionId]
  );
};
