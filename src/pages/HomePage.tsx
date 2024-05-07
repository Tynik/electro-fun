import React from 'react';
import { Alert, Box, Typography, useTheme } from '@mui/material';

import type { Product, FoundDatasheets, Nullable } from '~/types';

import { DbContext } from '~/providers';
import { SearchResultsPage } from './SearchResultsPage';

export type HomePageProps = {
  products: Product[];
  foundProducts?: Nullable<Product[]>;
  foundDatasheets?: Nullable<FoundDatasheets>;
  isSearching?: boolean;
  onSearchReset?: () => void;
};

export const HomePage = (props: HomePageProps) => {
  const { products, foundProducts, foundDatasheets, isSearching, onSearchReset } = props;

  const theme = useTheme();
  const { db } = React.useContext(DbContext);

  return (
    <>
      {!foundProducts && !isSearching && (
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
              backgroundImage: 'url(assets/images/home-page-back.webp)',
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
            <Alert color="info" sx={{ justifyContent: 'center' }}>
              🚚 Don't miss out on our incredible shipping rates starting from just{' '}
              <strong>£1.55</strong>!
              <br />
              📦 Shop now and enjoy fast and affordable delivery to your doorstep. 🔥
            </Alert>
          </Box>
        </Box>
      )}

      <SearchResultsPage
        isSearching={isSearching}
        products={products}
        foundProducts={foundProducts}
        foundDatasheets={foundDatasheets}
        onSearchReset={onSearchReset}
      />
    </>
  );
};
