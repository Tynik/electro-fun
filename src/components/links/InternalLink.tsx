import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom';

import type { LinkProps } from '@mui/material';

import { useTheme, Link } from '@mui/material';

export type InternalLinkProps = Omit<RouterLinkProps & LinkProps, 'component'> & {
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
}

export const InternalLink = (props: InternalLinkProps) => {
  const {
    children,
    startIcon,
    endIcon,
    ...rest
  } = props;

  const theme = useTheme();

  const startIconEl = React.useMemo(() =>
    startIcon ? React.cloneElement(startIcon, {
      fontSize: 'inherit',
      sx: {
        marginRight: theme.spacing(1)
      }
    }) : '', []);

  const endIconEl = React.useMemo(() =>
    endIcon ? React.cloneElement(endIcon, {
      fontSize: 'inherit',
      sx: {
        marginLeft: theme.spacing(1)
      }
    }) : '', []);

  return (
    <Link
      color={'inherit'}
      {...rest}
      component={RouterLink}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      {startIconEl}
      {children}
      {endIconEl}
    </Link>
  );
};
