import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

import type { FoundDatasheets } from '~/types';
import { sortDatasheets } from '~/helpers';
import { ExternalLink } from '~/components';

export type DatasheetsListProps = {
  datasheets: FoundDatasheets;
};

export const DatasheetsList = ({ datasheets }: DatasheetsListProps) => {
  const sortedDatasheetIds = sortDatasheets(datasheets);

  return (
    <List disablePadding>
      {sortedDatasheetIds.map(datasheetId => (
        <ListItem key={datasheetId} disablePadding>
          <ListItemText>
            <ExternalLink
              href={`/assets/datasheets/${datasheetId}.pdf`}
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
  );
};
