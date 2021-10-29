import React from 'react';
import {
  Typography,
} from '@material-ui/core';

import { DatasheetIdT } from '../types';
import { DbContext } from '../context';
import { Datasheets } from '../components';

export type ItemInfoActionsProps = {
  relatedDatasheetIds: DatasheetIdT[]
}

export const ItemInfoRelatedDatasheets = ({ relatedDatasheetIds }: ItemInfoActionsProps) => {
  const { db } = React.useContext(DbContext);

  return (
    <>
      <Typography variant={'overline'}>
        Связанные datasheets
      </Typography>

      <Datasheets
        datasheets={relatedDatasheetIds.reduce((datasheets, datasheetId) => (
          {
            ...datasheets,
            [datasheetId]: db.datasheets[datasheetId]
          }
        ), {})}
      />
    </>
  );
};
