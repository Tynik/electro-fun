import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, useTheme } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';

import type { ItemAccessory } from '~/types';

export type ItemInfoAccessoriesProps = {
  accessories: ItemAccessory[];
};

export const ItemInfoAccessories = ({ accessories }: ItemInfoAccessoriesProps) => {
  const theme = useTheme();

  return (
    <>
      <Typography variant={'overline'}>Package contents</Typography>

      <List disablePadding>
        {accessories.map(accessory => (
          <ListItem key={accessory.name} disablePadding>
            <ListItemIcon sx={{ minWidth: theme.spacing(1) }}>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText>
              {accessory.count}x {accessory.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
