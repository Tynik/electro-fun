import React from 'react';
import { Link, LinkProps } from '@material-ui/core';

export interface ExternalLinkProps extends Omit<LinkProps, 'target'> {
  children: JSX.Element | JSX.Element[] | string
}

export const ExternalLink = ({ children, ...props }: ExternalLinkProps) => {
  return (
    <Link {...props} target={'_blank'}>
      {children}
    </Link>
  );
};
