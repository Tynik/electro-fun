import React from 'react';
import sortBy from 'lodash.sortby';
import { Divider, List, Drawer as MuiDrawer, useTheme, styled } from '@mui/material';

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
}>(({ drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
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

const Menu = (props: MenuProps) => {
  const { onOpen, onSearch, drawerWidth } = props;

  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  const { set: saveMenuIsOpenedState, initialValue: menuIsOpenedInitialState } =
    useLocalStorage<boolean>('menuIsOpened');

  const [menuIsOpened, setMenuOpen] = React.useState<boolean>(menuIsOpenedInitialState);

  React.useEffect(() => {
    onOpen(menuIsOpened);
  }, [menuIsOpened]);

  const onToggleMenuHandler = React.useCallback((state: boolean) => {
    setMenuOpen(state);
    saveMenuIsOpenedState(state);
  }, []);

  const openMenu = React.useCallback(() => {
    onToggleMenuHandler(true);
  }, []);

  const closeMenu = React.useCallback(() => {
    onToggleMenuHandler(false);
  }, []);

  const categories = React.useMemo(() => {
    return sortBy(db.categories, 'name');
  }, []);

  return (
    <>
      <AppBar
        menuIsOpened={menuIsOpened}
        drawerWidth={drawerWidth}
        onSearch={onSearch}
        onOpenMenu={openMenu}
      />

      <Drawer variant={'persistent'} anchor={'left'} open={menuIsOpened} drawerWidth={drawerWidth}>
        <DrawerHeader>
          <CIconButton
            onClick={closeMenu}
            icon={getIcon(theme.direction === 'ltr' ? 'chevronLeft' : 'chevronRight')}
            aria-label={'Закрыть основное меню'}
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

export default Menu;
