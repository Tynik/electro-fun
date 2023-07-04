import React from 'react';
import { Typography } from '@mui/material';

import type { DatasheetId, Datasheets } from '~/types';

import { DbContext } from '~/contexts';
import { DatasheetsList } from '~/components';

export type ItemInfoRelatedDatasheetsProps = {
  relatedDatasheetIds: DatasheetId[];
};

export const ItemInfoRelatedDatasheets = ({
  relatedDatasheetIds,
}: ItemInfoRelatedDatasheetsProps) => {
  const { db } = React.useContext(DbContext);

  const datasheets = React.useMemo(
    () =>
      relatedDatasheetIds.reduce<Datasheets>(
        (datasheets, datasheetId) => ({
          ...datasheets,
          [datasheetId]: db.datasheets[datasheetId],
        }),
        {}
      ),
    [relatedDatasheetIds]
  );

  return (
    <>
      <Typography variant={'overline'}>Related Datasheets</Typography>

      <DatasheetsList datasheets={datasheets} />
    </>
  );
};
