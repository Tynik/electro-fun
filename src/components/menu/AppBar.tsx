import React from 'react';
import { styled, AppBar as MuiAppBar } from '@mui/material';

import MainToolbar, { ToolbarProps } from './MainToolbar';

export type StyledAppBarProps = {
  open: boolean;
  drawerWidth: number;
};

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => ['open', 'drawerWidth'].indexOf(prop as string) === -1,
})<StyledAppBarProps>(({ open, drawerWidth, theme: { transitions } }) => ({
  transition: transitions.create(['margin', 'width'], {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
  }),
}));

export type AppBarProps = Pick<ToolbarProps, 'onSearch' | 'onOpenMenu'> & {
  isMenuOpened: boolean;
  drawerWidth: number;
};

const AppBar = ({ isMenuOpened, drawerWidth, onSearch, onOpenMenu }: AppBarProps) => {
  return (
    <StyledAppBar position="fixed" open={isMenuOpened} drawerWidth={drawerWidth}>
      <MainToolbar menuIsOpened={isMenuOpened} onSearch={onSearch} onOpenMenu={onOpenMenu} />
    </StyledAppBar>
  );
};

export default AppBar;
