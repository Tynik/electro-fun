import React from 'react';
import { Alert, Box, Typography, useTheme } from '@mui/material';

import type { Items, FoundDatasheets } from '~/types';

import { DbContext } from '~/contexts';
import { SearchResultsPage } from './SearchResultsPage';

export type HomePageProps = {
  items: Items;
  foundItems?: Items;
  foundDatasheets?: FoundDatasheets;
  isSearching?: boolean;
  onSearchReset?: () => void;
};

export const HomePage = (props: HomePageProps) => {
  const { items, foundItems, foundDatasheets, isSearching, onSearchReset } = props;

  const theme = useTheme();
  const { db } = React.useContext(DbContext);

  return (
    <>
      {!foundItems && !isSearching && (
        <Box
          sx={{
            margin: {
              xs: theme.spacing(5, 0, 5),
              md: theme.spacing(10, 0, 20),
            },
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography variant={'h1'} fontWeight="bold">
            {db.siteName}
          </Typography>

          <Typography variant={'h5'} alignSelf={'end'}>
            Electronic Parts Store
          </Typography>

          <Box sx={{ padding: { md: theme.spacing(0, 12) }, marginTop: { xs: 2, md: 10 } }}>
            <Alert color="info">
              🚚 Don't miss out on our incredible shipping rates starting from just{' '}
              <strong>£1.35</strong>! 📦 Shop now and enjoy fast and affordable delivery to your
              doorstep. Hurry, limited time offer! 🔥
            </Alert>
          </Box>
        </Box>
      )}

      <SearchResultsPage
        isSearching={isSearching}
        items={items}
        foundItems={foundItems}
        foundDatasheets={foundDatasheets}
        onSearchReset={onSearchReset}
      />
    </>
  );
};
