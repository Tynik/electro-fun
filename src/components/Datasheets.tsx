import React from 'react';
import {
  List,
  ListItem
} from '@material-ui/core';

import { ExternalLink } from '../components';
import { DatasheetsT } from '../types';

export type DatasheetsProps = {
  datasheets: DatasheetsT
}

export const Datasheets = ({ datasheets }: DatasheetsProps) => {
  const sortedDatasheets = Object.keys(datasheets).sort();

  return (
    <List disablePadding>
      {sortedDatasheets.map(datasheetId => (
        <ListItem key={datasheetId} disablePadding>
          <ExternalLink
            href={datasheets[datasheetId].url}
            hrefLang={datasheets[datasheetId].lang}
          >
            {datasheetId}
          </ExternalLink>
        </ListItem>
      ))}
    </List>
  )
};
