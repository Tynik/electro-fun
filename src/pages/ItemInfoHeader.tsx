import React from 'react';
import {
  Typography,
  Box,
  Chip,
  useTheme
} from '@material-ui/core';

import { ItemT } from '../types';
import { DbContext } from '../context';
import { InternalLink } from '../components';
import { getIcon } from '../utils';

export type ItemInfoHeaderProps = {
  item: ItemT
}

export const ItemInfoHeader = ({ item }: ItemInfoHeaderProps) => {
  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  const category = React.useMemo(
    () =>
      item ? db.categories.find(category => category.id === item.categoryId) : null,
    [item]
  );

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant={'subtitle1'}>
          <InternalLink
            underline={'hover'}
            color={'inherit'}
            startIcon={getIcon(category.icon)}
            endIcon={getIcon('doubleArrow')}
            to={`/category/${category.id}`}
          >
            {category.name}
          </InternalLink>
        </Typography>

        <Typography
          variant={'h5'}
          role={'heading'}
          aria-level={1}
          sx={{ marginLeft: theme.spacing(1) }}
        >
          {item.title}
        </Typography>

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
