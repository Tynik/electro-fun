import React from 'react';

import { useSmoothScroll } from '~/hooks';
import { DatasheetsProps, Datasheets } from '~/components';

export type DatasheetsPageProps = Pick<DatasheetsProps, 'datasheets'> & {}

export const DatasheetsPage = ({ datasheets }: DatasheetsPageProps) => {
  useSmoothScroll({ top: 0, left: 0 });

  return (
    <Datasheets datasheets={datasheets}/>
  );
};
