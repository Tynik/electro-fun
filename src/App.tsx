import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, styled, LinearProgress } from '@mui/material';

import { DbContext } from './contexts';
import { Menu, DrawerHeader, Category, Footer } from './components';
import {
  HomePage,
  ItemInfoPage,
  DatasheetsPage,
  BasketPage,
  ReturnPolicyPage,
  PrivacyPolicyPage,
} from './pages';
import { useJsonDbSearch } from './hooks';

const drawerWidth = 240;

const Main = styled('div', {
  shouldForwardProp: prop => prop !== 'menuIsOpened',
})<{
  menuIsOpened: boolean;
}>(({ theme, menuIsOpened }) => ({
  flexGrow: 1,
  padding: theme.spacing(2, 0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(menuIsOpened && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isAlreadyMounted, setIsAlreadyMounted] = React.useState(false);
  const [menuIsOpened, setMenuOpen] = React.useState(false);

  const { db, loadNextDbPart } = React.useContext(DbContext);

  const { isSearching, search, foundItems, foundDatasheets } = useJsonDbSearch(db, loadNextDbPart);

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
                    items={db.items}
                    foundItems={foundItems}
                    foundDatasheets={foundDatasheets}
                    onSearchReset={onSearchReset}
                  />
                }
              />

              <Route path="/item/:id" element={<ItemInfoPage />} />

              <Route path="/category/:categoryId" element={<Category />} />

              <Route path="/datasheets" element={<DatasheetsPage datasheets={db.datasheets} />} />

              <Route path="/basket" element={<BasketPage />} />

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
