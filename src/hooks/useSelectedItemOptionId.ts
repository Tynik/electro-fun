import React from 'react';

import type { Item } from '~/types';

import { useQueryParams } from '~/utils';
import { getItemDefaultOption } from '~/helpers';

export const useSelectedItemOptionId = (
  item: Item,
  applyDefault: boolean = true
): string | null => {
  const { optionId: selectedItemOptionId } = useQueryParams();

  return React.useMemo(
    () => item && (selectedItemOptionId || (applyDefault && getItemDefaultOption(item))),
    [item, selectedItemOptionId]
  );
};
