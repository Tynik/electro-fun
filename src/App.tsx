import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import {
  LinearProgress,
  Box,
  styled
} from '@material-ui/core';

import {
  Menu,
  DrawerHeader,
  Items,
  Datasheets,
  ItemInfo,
  Footer
} from './components';
import { DbContext } from './context';
import { useDb, useDbSearch } from './hooks';
import './App.scss';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: any) => (
    {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(
        open && {
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

  const [isAlreadyMounted, setIsAlreadyMounted] = React.useState(false);
  const [menuIsOpened, setMenuOpen] = React.useState(false);
  const {
    db,
    errors,
    printErrors,
    isNextDbPart,
    loadNextDbPart
  } = useDb();
  const { search, foundItems } = useDbSearch(db, loadNextDbPart);

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
    search(text);
  };

  if (errors.length) {
    return printErrors();
  }
  if (!db) {
    return <LinearProgress/>;
  }
  return (
    <DbContext.Provider value={{ db, isNextDbPart, loadNextDbPart }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ display: 'flex' }}>
          <Menu
            onOpen={setMenuOpen}
            drawerWidth={drawerWidth}
            onSearch={onSearch}
          />

          <Main open={menuIsOpened}>
            <DrawerHeader/>

            <Switch>
              <Route path="/" exact>
                <Items items={foundItems ? foundItems : db.items}/>
              </Route>
              <Route path="/item/:id">
                <ItemInfo/>
              </Route>
              <Route path="/datasheets">
                <Datasheets/>
              </Route>
            </Switch>
          </Main>
        </Box>

        <Footer/>
      </Box>
    </DbContext.Provider>
  );
};
