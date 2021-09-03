import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  Typography,
  InputBase,
  Drawer,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  styled
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import { DbContext } from '../context';
import { getIcon } from '../utils';

const Search = styled('div')(({ theme }) => (
  {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  }
));

const SearchIconWrapper = styled('div')(({ theme }) => (
  {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
));

const StyledInputBase = styled(InputBase)(({ theme }) => (
  {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch'
      }
    }
  }
));

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
  onSearch: (text: string) => void
}

export const Menu = (props: MenuProps) => {
  const {
    drawerWidth,
    onOpen,
    onSearch
  } = props;

  const theme = useTheme();

  const [menuIsOpened, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    onOpen(menuIsOpened);
  }, [menuIsOpened]);

  const { db } = React.useContext(DbContext);

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

          <Typography
            variant="h6"
            component={RouterLink}
            to={'/'}
            sx={{
              display: { xs: 'none', sm: 'block' },
              whiteSpace: 'nowrap',
              color: 'white',
              textDecoration: 'none'
            }}
          >
            {db.siteName}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={'Найти...'}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => onSearch(e.target.value)}
            />
          </Search>
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
          {Object.keys(db.categories).map(categoryId => (
            <ListItem
              key={`category-${categoryId}`}
              component={RouterLink}
              to={`/category/${categoryId}`}
              sx={{
                textDecoration: 'none',
                color: theme.palette.text.primary,
                // backgroundColor: theme.palette.action.selected
              }}
              button
            >
              <ListItemIcon>{getIcon(db.categories[categoryId].icon)}</ListItemIcon>
              <ListItemText>{db.categories[categoryId].name}</ListItemText>
            </ListItem>
          ))}

          {db.menu.map(itemMenu => (
            <ListItem
              key={itemMenu.name}
              component={RouterLink}
              to={itemMenu.url}
              sx={{
                textDecoration: 'none',
                color: theme.palette.text.primary
              }}
              button
            >
              <ListItemIcon>{getIcon(itemMenu.icon)}</ListItemIcon>
              <ListItemText>{itemMenu.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
