import React from 'react';

import type { ButtonProps, LinkTypeMap } from '@mui/material';

import { Button } from '@mui/material';

import { useUpMediaQuery } from '~/hooks';

export interface ExternalButtonLinkProps
  extends Omit<ButtonProps<LinkTypeMap['defaultComponent']>, 'target' | 'component' | 'size'> {
  href: ButtonProps['href']
}

export const ExternalButtonLink = ({ children, ...props }: ExternalButtonLinkProps) => {
  const smMatch = useUpMediaQuery('sm');

  return (
    <Button
      {...props}
      component={'a'}
      target={'_blank'}
      size={smMatch ? 'medium' : 'small'}
    >
      {children}
    </Button>
  );
};
