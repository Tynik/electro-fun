import React from 'react';
import {
  List,
  ListItem
} from '@material-ui/core';

import { ExternalLink } from '../components';
import { DatasheetIdT, DatasheetT } from '../types';

export type DatasheetsProps = {
  datasheets: Record<DatasheetIdT, DatasheetT & {
    // for sorting
    priority?: number
  }>
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
        </ListItem>
      ))}
    </List>
  )
};
