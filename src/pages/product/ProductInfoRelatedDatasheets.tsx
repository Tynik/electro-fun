import React from 'react';
import { Typography } from '@mui/material';

import type { DatasheetId, Datasheets } from '~/types';

import { DbContext } from '~/providers';
import { DatasheetsList } from '~/components';

export type ProductInfoRelatedDatasheetsProps = {
  relatedDatasheetIds: DatasheetId[];
};

export const ProductInfoRelatedDatasheets = ({
  relatedDatasheetIds,
}: ProductInfoRelatedDatasheetsProps) => {
  const { db } = React.useContext(DbContext);

  const datasheets = React.useMemo(
    () =>
      relatedDatasheetIds.reduce<Datasheets>(
        (datasheets, datasheetId) => ({
          ...datasheets,
          [datasheetId]: db.datasheets[datasheetId],
        }),
        {},
      ),
    [relatedDatasheetIds],
  );

  return (
    <>
      <Typography variant={'overline'}>Related Datasheets</Typography>

      <DatasheetsList datasheets={datasheets} />
    </>
  );
};
