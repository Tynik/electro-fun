import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';
import {
  Container,
  Box,
  styled,
  Typography,
  Alert,
  useTheme,
  LinearProgress
} from '@material-ui/core';

import {
  Menu,
  DrawerHeader,
  Datasheets,
  Category,
  Footer
} from './components';
import {
  Items,
  ItemInfo
} from './pages';
import { DbContext } from './context';
import { useDb, useDbSearch } from './hooks';
import { Loader } from './components';

const drawerWidth = 240;

const Main = styled('div', {
  shouldForwardProp: (prop) => prop !== 'menuIsOpened'
})(({ theme, menuIsOpened }: any) => (
    {
      flexGrow: 1,
      padding: theme.spacing(2, 0),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(
        menuIsOpened && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
          }),
          marginLeft: 0
        }
      )
    }
  )
);

export const App = () => {
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();

  const [isAlreadyMounted, setIsAlreadyMounted] = React.useState(false);
  const [menuIsOpened, setMenuOpen] = React.useState(false);
  const {
    db,
    errors,
    printErrors,
    isNextDbPart,
    loadNextDbPart,
    isNextPage,
    loadNextPage
  } = useDb();

  const {
    isSearching,
    search,
    foundItems,
    foundDatasheets
  } = useDbSearch(db, loadNextDbPart);

  React.useEffect(() => {
    if (db && !isAlreadyMounted) {
      setIsAlreadyMounted(true);

      document.title = db.seo.title;

      const meta = document.getElementsByTagName('meta');
      meta['description'].content = db.seo.description;
      meta['keywords'].content = db.seo.keywords;
    }
  }, [db, isAlreadyMounted]);

  const onSearch = (text: string) => {
    if (location.pathname !== '/') {
      history.push('/');
    }
    search({ text });
  };

  const debouncedSearch = React.useMemo(() => {
    return debounce(onSearch, 750);
  }, []);

  if (errors.length) {
    return printErrors();
  }
  if (!db) {
    return <LinearProgress/>;
  }
  return (
    <DbContext.Provider value={{
      db,
      isNextDbPart,
      loadNextDbPart,
      isNextPage,
      loadNextPage
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ display: 'flex' }}>
          <Menu
            onOpen={setMenuOpen}
            drawerWidth={drawerWidth}
            onSearch={debouncedSearch}
          />

          <Main menuIsOpened={menuIsOpened}>
            <DrawerHeader/>

            <Container>
              <Switch>
                <Route path="/" exact>
                  {isSearching ? (
                    <Loader label={'Поиск...'}/>
                  ) : (
                    <>
                      {foundItems !== null && !foundItems.length && !Object.keys(foundDatasheets).length && (
                        <Alert severity={'info'}>Ничего не найдено</Alert>
                      )}

                      <Box sx={{ marginTop: theme.spacing(2) }}>
                        <Items items={foundItems ? foundItems : db.items}/>
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
                  )}
                </Route>
                <Route path="/item/:id">
                  <ItemInfo/>
                </Route>
                <Route path="/category/:categoryId">
                  <Category/>
                </Route>
                <Route path="/datasheets">
                  <Datasheets datasheets={db.datasheets}/>
                </Route>
              </Switch>
            </Container>
          </Main>
        </Box>

        <Footer/>
      </Box>
    </DbContext.Provider>
  );
};
