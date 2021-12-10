import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import { FoundDatasheetsT } from '../types';
import { sortDatasheets } from '../helpers';
import { ExternalLink } from '../components';

export type DatasheetsProps = {
  datasheets: FoundDatasheetsT
}

export const Datasheets = ({ datasheets }: DatasheetsProps) => {
  const sortedDatasheetIds = sortDatasheets(datasheets);

  return (
    <List disablePadding>
      {sortedDatasheetIds.map(datasheetId => (
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
