import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@material-ui/core';

export type MenuItemProps = {
  to: string
  icon: React.ReactElement
  name: string
}

export const MenuItem = (props: MenuItemProps) => {
  const {
    to,
    icon,
    name,
  } = props;

  const theme = useTheme();
  const location = useLocation();

  return (
    <ListItem
      component={RouterLink}
      to={to}
      sx={{
        textDecoration: 'none',
        color: theme.palette.text.primary,
        backgroundColor: to === location.pathname
          ? theme.palette.action.selected
          : 'inherit'
      }}
      button
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{name}</ListItemText>
    </ListItem>
  );
};
