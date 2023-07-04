import React from 'react';

import { useSmoothScroll } from '~/hooks';
import type { DatasheetsListProps } from '~/components';
import { DatasheetsList } from '~/components';

export type DatasheetsPageProps = Pick<DatasheetsListProps, 'datasheets'> & {};

export const DatasheetsPage = ({ datasheets }: DatasheetsPageProps) => {
  useSmoothScroll({ top: 0, left: 0 });

  return <DatasheetsList datasheets={datasheets} />;
};
