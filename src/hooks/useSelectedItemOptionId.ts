import React from 'react';

import type { ItemT } from '~/types';

import { useQueryParams } from '~/utils';
import { getItemDefaultOption } from '~/helpers';

export const useSelectedItemOptionId = (
  item: ItemT,
  applyDefault: boolean = true
): string | null => {
  const { optionId: selectedItemOptionId } = useQueryParams();

  return React.useMemo(() =>
      item && (selectedItemOptionId || (applyDefault && getItemDefaultOption(item))),
    [item, selectedItemOptionId]
  );
};
