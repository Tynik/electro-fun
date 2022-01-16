import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  useTheme
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';

import type { ItemPeculiarity } from '~/types';

export type ItemInfoPeculiaritiesProps = {
  peculiarities: ItemPeculiarity[]
}

export const ItemInfoPeculiarities = ({ peculiarities }: ItemInfoPeculiaritiesProps) => {
  const theme = useTheme();

  return (
    <>
      <Typography variant={'overline'}>
        Особенности
      </Typography>

      <List disablePadding>
        {peculiarities.map(peculiarity => (
          <ListItem key={peculiarity} disablePadding>
            <ListItemIcon sx={{ minWidth: theme.spacing(1) }}>
              <ArrowRightIcon/>
            </ListItemIcon>
            <ListItemText>{peculiarity}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
