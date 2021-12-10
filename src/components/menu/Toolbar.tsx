import React from 'react';
import {
  Toolbar as MuiToolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';

import { DbContext } from '../../context';

import Search from './Search';

export type ToolbarProps = {
  menuIsOpened: boolean
  searchValue: string
  setSearchValue: (value: string) => void
  onSearch: (text: string) => void
  onToggleMenu: (state: boolean) => void
}

const Toolbar = (props: ToolbarProps) => {
  const {
    menuIsOpened,
    searchValue,
    setSearchValue,
    onSearch,
    onToggleMenu
  } = props;

  const { db } = React.useContext(DbContext);

  const onSiteNameClick = React.useCallback(() => {
    setSearchValue('');
  }, []);

  const onToggleMenuHandler =  React.useCallback(() => {
    onToggleMenu(true);
  }, []);

  return (
    <MuiToolbar>
      <IconButton
        color={'inherit'}
        aria-label={'open drawer'}
        onClick={onToggleMenuHandler}
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
    </MuiToolbar>
  );
};

export default Toolbar;
