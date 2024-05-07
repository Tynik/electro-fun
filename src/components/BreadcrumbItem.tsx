import React from 'react';
import { Typography } from '@mui/material';

import { InternalLink } from './links';

export type BreadcrumbItemProps = {
  final?: boolean;
  to?: string;
  icon?: React.ReactElement;
  children: React.ReactNode;
};

export const BreadcrumbItem = ({
  final = false,
  to = null,
  icon = null,
  children,
}: BreadcrumbItemProps) => {
  const iconElement =
    icon &&
    React.cloneElement(icon, {
      sx: {
        marginRight: 0.5,
        color: 'text.secondary',
      },
      fontSize: 'inherit',
    });

  return (
    <>
      {!final && (
        <InternalLink underline="hover" startIcon={iconElement} to={to}>
          {children}
        </InternalLink>
      )}

      {final && (
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} color="text.primary">
          {iconElement}

          {children}
        </Typography>
      )}
    </>
  );
};
