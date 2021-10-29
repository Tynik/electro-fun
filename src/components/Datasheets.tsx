import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import { FoundDatasheetsT } from '../types';
import { ExternalLink } from '../components';

export type DatasheetsProps = {
  datasheets: FoundDatasheetsT
}

export const Datasheets = ({ datasheets }: DatasheetsProps) => {
  const sortedDatasheets = Object.keys(datasheets)
    .sort((datasheetIdA, datasheetIdB) => {
      if (datasheets[datasheetIdA].priority === undefined) {
        return 1;
      }
      if (datasheets[datasheetIdB].priority === undefined) {
        return -1;
      }
      return datasheets[datasheetIdA].priority - datasheets[datasheetIdB].priority;
    });

  return (
    <List disablePadding>
      {sortedDatasheets.map(datasheetId => (
        <ListItem key={datasheetId} disablePadding>
          <ListItemText>
            <ExternalLink
              href={datasheets[datasheetId].url}
              hrefLang={datasheets[datasheetId].lang}
            >
              {datasheets[datasheetId].priority === 0 ? (
                <strong>{datasheetId}</strong>
              ) : (
                <>{datasheetId}</>
              )}
            </ExternalLink>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
};
