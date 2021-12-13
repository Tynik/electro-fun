import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Toolbar as MuiToolbar,
  Typography
} from '@material-ui/core';
import {
  Menu as MenuIcon,
} from '@material-ui/icons';

import { DbContext, UserContext } from '../../contexts';

import { getIcon } from '../../utils';
import CIconButton from '../CIconButton';
import Search from './Search';

export type ToolbarProps = {
  menuIsOpened: boolean
  onSearch: (text: string) => void
  onOpenMenu: () => void
}

const Toolbar = (props: ToolbarProps) => {
  const {
    menuIsOpened,
    onSearch,
    onOpenMenu
  } = props;

  const { db } = React.useContext(DbContext);
  const { user } = React.useContext(UserContext);

  const [searchValue, setSearchValue] = React.useState<string>(null);

  React.useEffect(() => {
    if (searchValue === null) {
      return;
    }
    onSearch(searchValue);
  }, [searchValue]);

  const onSiteNameClick = React.useCallback(() => {
    setSearchValue('');
  }, []);

  return (
    <MuiToolbar>
      <CIconButton
        onClick={onOpenMenu}
        icon={getIcon('menu')}
        aria-label={'Открыть основное меню'}
        edge={'start'}
        sx={{
          mr: 2, ...(
            menuIsOpened && { display: 'none' }
          )
        }}
      />

      <Typography
        variant={'h6'}
        component={RouterLink}
        to={'/'}
        onClick={onSiteNameClick}
        sx={{
          display: { xs: 'none', sm: 'block' },
          whiteSpace: 'nowrap',
          color: 'white',
          textDecoration: 'none'
        }}
      >
        {db.siteName}
      </Typography>

      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={onSearch}
      />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <CIconButton
          badgeContent={user.basket.items.length}
          icon={getIcon('shoppingBasket')}
          aria-label={'Открыть корзину'}
        />
      </Box>
    </MuiToolbar>
  );
};

export default Toolbar;
