import React from 'react';
import {
  Alert,
  useTheme,
  Box,
  Typography
} from '@material-ui/core';

import { ItemsT, DatasheetsT } from '../types';
import { Loader, Items, Datasheets } from '../components';

export type SearchResultsPageProps = {
  items: ItemsT
  foundDatasheets?: DatasheetsT
  foundItems?: ItemsT
  isSearching?: boolean
}

export const SearchResultsPage = (props: SearchResultsPageProps) => {
  const {
    items,
    foundItems = null,
    foundDatasheets = null,
    isSearching = false
  } = props;

  const theme = useTheme();

  if (isSearching) {
    return <Loader label={'Поиск...'}/>;
  }

  return (
    <>
      {foundItems !== null && !foundItems.length && !Object.keys(foundDatasheets).length && (
        <Alert severity={'info'}>Ничего не найдено</Alert>
      )}

      <Box sx={{ marginTop: theme.spacing(2) }}>
        <Items items={foundItems ? foundItems : items}/>
      </Box>

      {foundDatasheets && Object.keys(foundDatasheets).length > 0 && (
        <Box sx={{ marginTop: theme.spacing(2) }}>
          <Typography variant={'h6'} role={'heading'} aria-level={2}>
            Найденные Datasheets
          </Typography>

          <Datasheets datasheets={foundDatasheets}/>
        </Box>
      )}
    </>
  );
};
