import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, useTheme } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';

import type { ProductPeculiarity } from '~/types';

export type ProductInfoPeculiaritiesProps = {
  peculiarities: ProductPeculiarity[];
};

export const ProductInfoPeculiarities = ({ peculiarities }: ProductInfoPeculiaritiesProps) => {
  const theme = useTheme();

  return (
    <>
      <Typography variant={'overline'}>Features</Typography>

      <List disablePadding>
        {peculiarities.map(peculiarity => (
          <ListItem key={peculiarity} alignItems="flex-start" disablePadding>
            <ListItemIcon sx={{ minWidth: theme.spacing(1) }}>
              <ArrowRightIcon />
            </ListItemIcon>

            <ListItemText>{peculiarity}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
