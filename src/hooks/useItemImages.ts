import React from 'react';

import type { Item, ItemImage } from '~/types';

import { useSelectedItemOptionId } from '~/hooks';

export const useItemImages = (item: Item): ItemImage[] | null => {
  const selectedItemOptionId = useSelectedItemOptionId(item, false);

  return React.useMemo(() => {
    return (
      (item &&
        item.images.filter(
          itemImage =>
            !itemImage.optionId ||
            !selectedItemOptionId ||
            itemImage.optionId === selectedItemOptionId
        )) ||
      []
    );
  }, [item, selectedItemOptionId]);
};
