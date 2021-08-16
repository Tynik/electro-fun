import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  LinearProgress,
  styled
} from '@material-ui/core';

import {
  Menu,
  DrawerHeader,
  Items,
  ItemInfo,
  Footer
} from './components';
import { AppContext } from './context';
import { Db } from './types';
import { preprocessDb } from './utils';
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
  const [db, setDb] = React.useState<Db>(null);
  const [menuIsOpened, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    fetch('/db.json').then(async (response) => {
      if (response.ok) {
        setDb(preprocessDb(await response.json()));
      }
    });
  }, []);

  React.useEffect(() => {
    if (db) {
      document.title = db.seo.title;

      const meta = document.getElementsByTagName('meta');
      meta['description'].content = db.seo.description;
      meta['keywords'].content = db.seo.keywords;
    }
  }, [db]);

  if (!db) {
    return <LinearProgress/>;
  }

  return (
    <AppContext.Provider value={{ db }}>
      <Menu onOpen={setMenuOpen} drawerWidth={drawerWidth}/>

      <Main open={menuIsOpened}>
        <DrawerHeader/>

        <Switch>
          <Route path="/" exact>
            <Items/>
          </Route>
          <Route path="/item/:id">
            <ItemInfo/>
          </Route>
        </Switch>
      </Main>

      <Footer/>
    </AppContext.Provider>
  );
};
