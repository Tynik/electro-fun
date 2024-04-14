import React from 'react';
import { InputBase, alpha, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import type { Nullable } from '~/types';

const StyledSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export type SearchProps = {
  searchValue: Nullable<string>;
  setSearchValue: (value: string) => void;
  onSearch: (text: string) => void;
};

const Search = (props: SearchProps) => {
  const { searchValue, setSearchValue, onSearch } = props;

  const onChange = React.useCallback(e => {
    setSearchValue(e.target.value);
  }, []);

  const onKeyPress = React.useCallback(
    e => {
      if (e.code === 'Enter' && e.target.value) {
        onSearch(e.target.value);
      }
    },
    [onSearch],
  );

  return (
    <StyledSearch>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        value={searchValue || ''}
        placeholder={'Search...'}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </StyledSearch>
  );
};

export default Search;
