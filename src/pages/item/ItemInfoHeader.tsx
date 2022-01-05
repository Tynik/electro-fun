import React from 'react';
import {
  Typography,
  Box,
  Chip,
  useTheme
} from '@mui/material';

import type { ItemT } from '~/types';

import { DbContext } from '~/contexts';
import { InternalLink } from '~/components';
import { getIcon } from '~/utils';

export type ItemInfoHeaderProps = {
  item: ItemT
}

export const ItemInfoHeader = ({ item }: ItemInfoHeaderProps) => {
  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  const category = React.useMemo(() =>
      db.categories.find(category => category.id === item.categoryId),
    []
  );

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
          itemType={'https://schema.org/BreadcrumbList'}
          itemScope
        >
          <Typography
            variant={'subtitle1'}
            itemProp={'itemListElement'}
            itemType={'https://schema.org/ListItem'}
            itemScope
          >
            <InternalLink
              underline={'hover'}
              startIcon={getIcon(category.icon)}
              endIcon={getIcon('doubleArrow')}
              to={`/category/${category.id}`}
              itemProp={'item'}
            >
              <span itemProp={'name'}>{category.name}</span>
            </InternalLink>
          </Typography>

          <Typography
            variant={'h5'}
            role={'heading'}
            aria-level={1}
            sx={{ marginLeft: theme.spacing(1) }}
            itemProp={'itemListElement'}
            itemType={'https://schema.org/ListItem'}
            itemScope
          >
            <span itemProp={'name'}>{item.title}</span>
          </Typography>
        </Box>

        {item.original === false && (
          <Chip
            size={'small'}
            label={'копия'}
            color={'info'}
            sx={{ marginLeft: theme.spacing(1) }}
          />
        )}
      </Box>

      <Typography
        variant={'subtitle1'}
        role={'heading'}
        aria-level={2}
        sx={{ marginLeft: theme.spacing(3) }}
      >
        {item.subtitle}
      </Typography>
    </>
  );
};
