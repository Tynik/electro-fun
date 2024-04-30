import React from 'react';
import sortBy from 'lodash.sortby';
import { Divider, List, Drawer as MuiDrawer, useTheme, styled, useMediaQuery } from '@mui/material';

import { DbContext } from '~/providers';
import { getIcon } from '~/utils';
import { useLocalStorage } from '~/hooks';

import AppBar, { AppBarProps } from './AppBar';
import MenuItem from './MenuItem';
import CIconButton from '~/components/CIconButton';

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => 'drawerWidth' !== prop,
})<{
  drawerWidth: number;
}>(({ drawerWidth, theme: { breakpoints } }) => ({
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export type MenuProps = Pick<AppBarProps, 'onSearch'> & {
  onOpen: (state: boolean) => void;
  drawerWidth: number;
};

export const Menu = ({ onOpen, onSearch, drawerWidth }: MenuProps) => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery<any>(({ breakpoints }) => breakpoints.down('md'));

  const { db } = React.useContext(DbContext);

  const { set: saveMenuIsOpenedState, initialValue: menuIsOpenedInitialState } =
    useLocalStorage<boolean>('menuIsOpened', false);

  const [menuIsOpened, setMenuOpen] = React.useState(menuIsOpenedInitialState);

  React.useEffect(() => {
    onOpen(menuIsOpened);
  }, [menuIsOpened]);

  const setNewMenuState = React.useCallback((state: boolean) => {
    setMenuOpen(state);
    saveMenuIsOpenedState(state);
  }, []);

  const openMenu = React.useCallback(() => {
    setNewMenuState(true);
  }, []);

  const closeMenu = React.useCallback(() => {
    setNewMenuState(false);
  }, []);

  const categories = React.useMemo(
    () =>
      sortBy(
        db.categories.filter(category => category.visible !== false),
        'name',
      ),
    [],
  );

  return (
    <>
      <AppBar
        isMenuOpened={menuIsOpened}
        drawerWidth={drawerWidth}
        onSearch={onSearch}
        onOpenMenu={openMenu}
      />

      <Drawer
        variant={isMdScreen ? 'temporary' : 'persistent'}
        anchor="left"
        open={menuIsOpened}
        drawerWidth={drawerWidth}
      >
        <DrawerHeader>
          <CIconButton
            onClick={closeMenu}
            icon={getIcon(theme.direction === 'ltr' ? 'chevronLeft' : 'chevronRight')}
          />
        </DrawerHeader>

        <Divider />

        <List>
          {categories.map(category => (
            <MenuItem
              key={`category-${category.id}`}
              to={`/category/${category.id}`}
              icon={getIcon(category.icon)}
              name={category.name}
              onClick={() => isMdScreen && closeMenu()}
            />
          ))}
        </List>

        <Divider />

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
