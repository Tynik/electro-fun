import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Toolbar, Typography } from '@mui/material';

import { DbContext, UserContext } from '~/contexts';
import { getIcon } from '~/utils';
import CIconButton from '~/components/CIconButton';

import Search from './Search';

export type ToolbarProps = {
  menuIsOpened: boolean;
  onSearch: (text: string) => void;
  onOpenMenu: () => void;
};

const MainToolbar = ({ menuIsOpened, onSearch, onOpenMenu }: ToolbarProps) => {
  const navigate = useNavigate();

  const { db } = React.useContext(DbContext);
  const { numberAllItemsInBasket } = React.useContext(UserContext);

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

  const onBasketClick = React.useCallback(() => {
    navigate('/basket');
  }, []);

  return (
    <Toolbar>
      <CIconButton
        onClick={onOpenMenu}
        icon={getIcon('menu')}
        edge={'start'}
        color={'inherit'}
        aria-label={'Open main menu'}
        sx={{
          mr: 2,
          ...(menuIsOpened && { display: 'none' }),
        }}
      />
      <img src={'/images/logo_128.png'} width="64px" />

      <Typography
        variant={'h6'}
        component={RouterLink}
        to={'/'}
        onClick={onSiteNameClick}
        sx={{
          display: { xs: 'none', sm: 'block' },
          marginLeft: 2,
          whiteSpace: 'nowrap',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        {db.siteName}
      </Typography>

      <Search searchValue={searchValue} setSearchValue={setSearchValue} onSearch={onSearch} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: 'flex' }}>
        <CIconButton
          onClick={onBasketClick}
          disabled={!numberAllItemsInBasket}
          badgeContent={numberAllItemsInBasket}
          icon={getIcon('shoppingBasket')}
          color={'inherit'}
          aria-label={'Open cart'}
        />
      </Box>
    </Toolbar>
  );
};

export default MainToolbar;
