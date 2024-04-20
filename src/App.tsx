import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, styled, LinearProgress } from '@mui/material';

import { DbContext } from './providers';
import { Menu, DrawerHeader, Category, Footer } from './components';
import {
  HomePage,
  ProductInfoPage,
  DatasheetsPage,
  BasketPage,
  ReturnPolicyPage,
  PrivacyPolicyPage,
  OrderConfirmationPage,
} from './pages';
import { useJsonDbSearch } from './hooks';

const drawerWidth = 240;

const Main = styled('div', {
  shouldForwardProp: prop => prop !== 'menuIsOpened',
})<{
  menuIsOpened: boolean;
}>(({ menuIsOpened, theme: { spacing, transitions, breakpoints } }) => ({
  flexGrow: 1,
  padding: spacing(2, 0),
  transition: transitions.create('margin', {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen,
  }),
  ...(menuIsOpened && {
    marginLeft: `${drawerWidth}px`,
    transition: transitions.create('margin', {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
    [breakpoints.down('md')]: {
      marginLeft: 0,
    },
  }),
}));

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isAlreadyMounted, setIsAlreadyMounted] = React.useState(false);
  const [menuIsOpened, setMenuOpen] = React.useState(false);

  const { db, loadNextDbPart } = React.useContext(DbContext);

  const { isSearching, search, foundProducts, foundDatasheets } = useJsonDbSearch(
    db,
    loadNextDbPart,
  );

  React.useEffect(() => {
    if (db && !isAlreadyMounted) {
      setIsAlreadyMounted(true);

      document.title = db.seo.title;

      const meta = document.getElementsByTagName('meta');

      meta['description'].content = db.seo.description;
      meta['keywords'].content = db.seo.keywords;
    }
  }, [db, isAlreadyMounted]);

  const onSearch = React.useCallback(
    (text: string) => {
      if (location.pathname !== '/') {
        navigate('/');
      }
      search({ text, debounce: true });
    },
    [location.pathname],
  );

  const onSearchReset = React.useCallback(() => {
    onSearch('');
  }, []);

  if (!db) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex' }}>
        <Menu onOpen={setMenuOpen} drawerWidth={drawerWidth} onSearch={onSearch} />

        <Main menuIsOpened={menuIsOpened}>
          <DrawerHeader />

          <Container>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    isSearching={isSearching}
                    products={db.items}
                    foundProducts={foundProducts}
                    foundDatasheets={foundDatasheets}
                    onSearchReset={onSearchReset}
                  />
                }
              />

              <Route path="/item/:id" element={<ProductInfoPage />} />

              <Route path="/category/:categoryId" element={<Category />} />

              <Route path="/datasheets" element={<DatasheetsPage datasheets={db.datasheets} />} />

              <Route path="/basket" element={<BasketPage />} />

              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

              <Route path="/return-policy" element={<ReturnPolicyPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </Main>
      </Box>

      <Footer />
    </Box>
  );
};
