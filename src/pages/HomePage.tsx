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
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              backgroundImage: 'url(images/home-page-back.webp)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
              top: 0,
              left: 0,
              right: 0,
              zIndex: -1,
            }}
          />

          <Typography
            variant={'h1'}
            fontWeight={'bold'}
            color={'white'}
            sx={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)' }}
          >
            {db.siteName}
          </Typography>

          <Typography
            variant={'h5'}
            alignSelf={'end'}
            color={'white'}
            sx={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)' }}
          >
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
