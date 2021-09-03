import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  useTheme
} from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { DbContext } from '../context';
import { BreadcrumbItem } from './BreadcrumbItem';

export type BreadcrumbsProps = {
  children: React.ReactNode
}

export const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  return (
    <MuiBreadcrumbs
      aria-label={'breadcrumb'}
      sx={{ marginBottom: theme.spacing(2) }}
    >
      <BreadcrumbItem to={'/'} icon={<HomeIcon/>}>
        {db.siteName}
      </BreadcrumbItem>

      {children}
    </MuiBreadcrumbs>
  );
};
