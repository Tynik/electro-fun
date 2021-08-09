import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  styled
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon
} from '@material-ui/icons';

import { AppContext } from '../context';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    ['open', 'drawerWidth'].indexOf(prop as string) === -1

})(({ theme, drawerWidth, open }: any) => (
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

const getIcon = (name) => {
  return {
    dashboard: <DashboardIcon/>
  }[name];
};

export const DrawerHeader = styled('div')(({ theme }) => (
  {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
));

export type MenuProps = {
  drawerWidth: number
  onOpen: (state: boolean) => void
}

export const Menu = (props: MenuProps) => {
  const {
    drawerWidth,
    onOpen
  } = props;

  const theme = useTheme();

  const [menuIsOpened, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    onOpen(menuIsOpened);
  }, [menuIsOpened])

  const { db } = React.useContext(AppContext);

  return (
    <>
      <AppBar position="fixed" open={menuIsOpened} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setMenuOpen(true)}
            edge="start"
            sx={{
              mr: 2, ...(
                menuIsOpened && { display: 'none' }
              )
            }}
          >
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={menuIsOpened}
      >
        <DrawerHeader>
          <IconButton onClick={() => setMenuOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
          {db.menu.map((itemMenu) => (
            <ListItem button key={itemMenu.name}>
              <ListItemIcon>{getIcon(itemMenu.icon)}</ListItemIcon>
              <ListItemText primary={itemMenu.name}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
