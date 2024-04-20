import React, { ReactElement } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';

export type MenuItemProps = LinkProps & {
  icon: ReactElement;
  name: string;
};

const MenuItem = ({ icon, name, ...props }: MenuItemProps) => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <ListItemButton
      component={RouterLink}
      sx={{
        textDecoration: 'none',
        color: theme.palette.text.primary,
        backgroundColor: props.to === location.pathname ? theme.palette.action.selected : 'inherit',
      }}
      {...props}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{name}</ListItemText>
    </ListItemButton>
  );
};

export default MenuItem;
