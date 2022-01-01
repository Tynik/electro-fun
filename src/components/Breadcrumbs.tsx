import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  useTheme
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { DbContext } from '../contexts';
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
