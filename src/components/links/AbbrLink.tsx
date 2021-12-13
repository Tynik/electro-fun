import React from 'react';

import type { ExternalLinkProps } from './ExternalLink';

import { ExternalLink } from './ExternalLink';

export interface AbbrLinkProps extends Omit<ExternalLinkProps, 'children'> {
  children: string
}

export const AbbrLink = ({ children, ...props }: AbbrLinkProps) => {
  return (
    <ExternalLink {...props}>
      <abbr>{children}</abbr>
    </ExternalLink>
  );
};
