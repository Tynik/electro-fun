import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';

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
        <Link
          underline={'hover'}
          color={'inherit'}
          sx={{ display: 'flex', alignItems: 'center' }}
          component={RouterLink}
          to={to}
        >
          {iconElement}
          {children}
        </Link>
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
