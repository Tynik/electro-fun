import React from 'react';
import { Alert, Box, Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import type { Items, FoundDatasheets } from '~/types';

import { Loader, ItemsList, DatasheetsList } from '~/components';

export type SearchResultsPageProps = {
  items: Items;
  foundDatasheets?: FoundDatasheets;
  foundItems?: Items;
  isSearching?: boolean;
  onSearchReset?: () => void;
};

export const SearchResultsPage = (props: SearchResultsPageProps) => {
  const {
    items,
    foundItems = null,
    foundDatasheets = null,
    isSearching = false,
    onSearchReset = null,
  } = props;

  if (isSearching) {
    return <Loader label={'Searching...'} />;
  }

  return (
    <>
      {foundItems && onSearchReset && (
        <Button size={'small'} startIcon={<RefreshIcon />} onClick={onSearchReset}>
          Reset search
        </Button>
      )}

      {foundItems !== null && !foundItems.length && !Object.keys(foundDatasheets).length && (
        <Alert severity={'info'}>Nothing found</Alert>
      )}

      <Box sx={{ marginTop: 2 }}>
        <ItemsList items={foundItems ? foundItems : items} />
      </Box>

      {foundDatasheets && Object.keys(foundDatasheets).length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant={'h6'} role={'heading'} aria-level={2}>
            Found Datasheets
          </Typography>

          <DatasheetsList datasheets={foundDatasheets} />
        </Box>
      )}
    </>
  );
};
