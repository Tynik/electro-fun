import React from 'react';
import { Typography } from '@mui/material';

import { InternalLink } from './links';

export type BreadcrumbItemProps = {
  final?: boolean
  to?: string
  icon?: React.ReactElement
  children: React.ReactNode
}

export const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const {
    final = false,
    to = null,
    icon = null,
    children
  } = props;

  const iconElement = icon && (
    React.cloneElement(icon, { sx: { mr: 0.5 }, fontSize: 'inherit' })
  );

  return (
    <>
      {!final && (
        <InternalLink
          underline={'hover'}
          startIcon={iconElement}
          to={to}
        >
          {children}
        </InternalLink>
      )}

      {final && (
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color={'text.primary'}
        >
          {iconElement}
          {children}
        </Typography>
      )}
    </>
  );
};
