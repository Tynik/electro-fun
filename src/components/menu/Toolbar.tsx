import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Box,
  Toolbar as MuiToolbar,
  Typography
} from '@material-ui/core';

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

  const history = useHistory();

  const { db } = React.useContext(DbContext);
  const { user } = React.useContext(UserContext);

  const [searchValue, setSearchValue] = React.useState<string>(null);

  const countItemsInBasket = React.useMemo(() =>
    Object.keys(user.basket.items).length,
    [user.basket.items]
  );

  React.useEffect(() => {
    if (searchValue === null) {
      return;
    }
    onSearch(searchValue);
  }, [searchValue]);

  const onSiteNameClick = React.useCallback(() => {
    setSearchValue('');
  }, []);

  const onBasketClick = React.useCallback(() => {
    history.push('/basket');
  }, []);

  return (
    <MuiToolbar>
      <CIconButton
        onClick={onOpenMenu}
        icon={getIcon('menu')}
        edge={'start'}
        color={'inherit'}
        aria-label={'Открыть основное меню'}
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

      <Box sx={{ flexGrow: 1 }}/>

      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <CIconButton
          onClick={onBasketClick}
          disabled={!countItemsInBasket}
          badgeContent={countItemsInBasket}
          icon={getIcon('shoppingBasket')}
          color={'inherit'}
          aria-label={'Открыть корзину'}
        />
      </Box>
    </MuiToolbar>
  );
};

export default Toolbar;
