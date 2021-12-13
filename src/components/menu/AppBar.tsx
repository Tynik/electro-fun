import React from 'react';
import {
  styled,
  AppBar as MuiAppBar,
  Theme
} from '@material-ui/core';

import Toolbar, { ToolbarProps } from './Toolbar';

export type StyledAppBarProps = {
  drawerWidth: number
  open: boolean
  theme?: Theme
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    ['open', 'drawerWidth'].indexOf(prop as string) === -1

})(({ theme, drawerWidth, open }: StyledAppBarProps) => (
  {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(
      open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    )
  }
));

export type AppBarProps = Pick<ToolbarProps, 'onSearch' | 'onOpenMenu'> & {
  menuIsOpened: boolean
  drawerWidth: number
}

const AppBar = (props: AppBarProps) => {
  const {
    menuIsOpened,
    drawerWidth,
    onSearch,
    onOpenMenu
  } = props;

  return (
    <StyledAppBar
      position={'fixed'}
      open={menuIsOpened}
      drawerWidth={drawerWidth}
    >
      <Toolbar
        menuIsOpened={menuIsOpened}
        onSearch={onSearch}
        onOpenMenu={onOpenMenu}
      />
    </StyledAppBar>
  );
};

export default AppBar;
