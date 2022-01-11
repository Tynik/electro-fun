import React from 'react';

import type { ItemT, ItemImageT } from '~/types';

import { useSelectedItemOptionId } from '~/hooks';

export const useItemImages = (item: ItemT): ItemImageT[] | null => {
  const selectedItemOptionId = useSelectedItemOptionId(item);

  return React.useMemo(() => {
    return item && item.images.filter(itemImage =>
      !itemImage.optionId || itemImage.optionId === selectedItemOptionId
    ) || [];
  }, [item, selectedItemOptionId]);
};
