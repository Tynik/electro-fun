import React from 'react';
import {
  Container,
  Link,
  List,
  ListItem
} from '@material-ui/core';
import { DbContext } from '../context';
import { ExternalLink } from '../components';

export const Datasheets = () => {
  const { db } = React.useContext(DbContext);

  const sortedDatasheets = Object.keys(db.datasheets).sort();

  return (
    <Container>
      <List>
        {sortedDatasheets.map(datasheet => (
          <ListItem key={datasheet}>
            <ExternalLink href={db.datasheets[datasheet].url}>
              {datasheet}
            </ExternalLink>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
