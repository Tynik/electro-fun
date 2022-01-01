import React from 'react';

import type { LinkProps } from '@mui/material';

import { Link } from '@mui/material';

export interface ExternalLinkProps extends Omit<LinkProps, 'target'> {
  href: string
}

export const ExternalLink = ({ children, ...props }: ExternalLinkProps) => {
  return (
    <Link {...props} target={'_blank'}>
      {children}
    </Link>
  );
};
