import React from 'react';
import {
  Typography
} from '@material-ui/core';

import { DatasheetIdT, DatasheetsT } from '../types';
import { DbContext } from '../contexts';
import { Datasheets } from '../components';

export type ItemInfoActionsProps = {
  relatedDatasheetIds: DatasheetIdT[]
}

export const ItemInfoRelatedDatasheets = ({ relatedDatasheetIds }: ItemInfoActionsProps) => {
  const { db } = React.useContext(DbContext);

  const datasheets = React.useMemo(
    () =>
      relatedDatasheetIds.reduce((datasheets, datasheetId) => (
          {
            ...datasheets,
            [datasheetId]: db.datasheets[datasheetId]
          }
        ), {} as DatasheetsT
      ),
    [relatedDatasheetIds]
  );

  return (
    <>
      <Typography variant={'overline'}>
        Связанные datasheets
      </Typography>

      <Datasheets
        datasheets={datasheets}
      />
    </>
  );
};
