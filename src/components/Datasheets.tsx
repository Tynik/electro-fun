import React from 'react';
import {
  Container,
  Link,
  List,
  ListItem
} from '@material-ui/core';
import { DbContext } from '../context';

export const Datasheets = () => {
  const { db } = React.useContext(DbContext);

  return (
    <Container>
      <List>
        {Object.keys(db.datasheets).map(datasheet => (
          <ListItem key={datasheet}>
            <Link href={db.datasheets[datasheet].url} target={'_blank'}>
              {datasheet}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
