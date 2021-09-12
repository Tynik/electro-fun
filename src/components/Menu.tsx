import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Divider,
  List,
  Typography,
  InputBase,
  Drawer,
  useTheme,
  alpha,
  styled
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import sortBy from 'lodash.sortby'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon
} from '@material-ui/icons';

import { DbContext } from '../context';
import { getIcon } from '../utils';
import { MenuItem } from './MenuItem';
import { useLocalStorage } from '../hooks';

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

  const { db } = React.useContext(DbContext);

  const [searchValue, setSearchValue] = React.useState<string>(null);

  const {
    set: setMenuIsOpenedInitialState,
    initialValue: menuIsOpenedInitialState
  } = useLocalStorage('menuIsOpened', 'boolean')

  const [menuIsOpened, setMenuOpen] = React.useState<boolean>(menuIsOpenedInitialState);

  React.useEffect(() => {
    onOpen(menuIsOpened);
  }, [menuIsOpened]);

  React.useEffect(() => {
    if (searchValue === null) {
      return;
    }
    onSearch(searchValue);
  }, [searchValue]);

  const onToggleMenuHandler = (state: boolean) => {
    setMenuOpen(state);
    setMenuIsOpenedInitialState(state);
  };

  return (
    <>
      <AppBar
        position={'fixed'}
        open={menuIsOpened}
        drawerWidth={drawerWidth}
      >
        <Toolbar>
          <IconButton
            color={'inherit'}
            aria-label={'open drawer'}
            onClick={() => onToggleMenuHandler(true)}
            edge={'start'}
            sx={{
              mr: 2, ...(
                menuIsOpened && { display: 'none' }
              )
            }}
          >
            <MenuIcon/>
          </IconButton>

          <Typography
            variant={'h6'}
            component={RouterLink}
            to={'/'}
            sx={{
              display: { xs: 'none', sm: 'block' },
              whiteSpace: 'nowrap',
              color: 'white',
              textDecoration: 'none'
            }}
            onClick={() => setSearchValue('')}
          >
            {db.siteName}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              value={searchValue || ''}
              placeholder={'Найти...'}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchValue(e.target.value)}
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
        variant={'persistent'}
        anchor={'left'}
        open={menuIsOpened}
      >
        <DrawerHeader>
          <IconButton onClick={() => onToggleMenuHandler(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
          {sortBy(db.categories, 'name').map(category => (
            <MenuItem
              key={`category-${category.id}`}
              to={`/category/${category.id}`}
              icon={getIcon(category.icon)}
              name={category.name}
            />
          ))}
        </List>
        <Divider/>
        <List>
          {db.menu.map(itemMenu => (
            <MenuItem
              key={itemMenu.name}
              to={itemMenu.url}
              icon={getIcon(itemMenu.icon)}
              name={itemMenu.name}
            />
          ))}
        </List>
      </Drawer>
    </>
  );
};
