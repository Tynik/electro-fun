import React from 'react';
import { Alert, Box, Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import type { Product, FoundDatasheets } from '~/types';

import { Loader, ProductsList, DatasheetsList } from '~/components';

export type SearchResultsPageProps = {
  products: Product[];
  foundDatasheets?: FoundDatasheets;
  foundProducts?: Product[];
  isSearching?: boolean;
  onSearchReset?: () => void;
};

export const SearchResultsPage = (props: SearchResultsPageProps) => {
  const {
    products,
    foundProducts = null,
    foundDatasheets = null,
    isSearching = false,
    onSearchReset = null,
  } = props;

  if (isSearching) {
    return <Loader label={'Searching...'} />;
  }

  return (
    <>
      {foundProducts && onSearchReset && (
        <Button size={'small'} startIcon={<RefreshIcon />} onClick={onSearchReset}>
          Reset search
        </Button>
      )}

      {foundProducts !== null && !foundProducts.length && !Object.keys(foundDatasheets).length && (
        <Alert severity={'info'}>Nothing found</Alert>
      )}

      <Box sx={{ marginTop: 2 }}>
        <ProductsList products={foundProducts ? foundProducts : products} />
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
