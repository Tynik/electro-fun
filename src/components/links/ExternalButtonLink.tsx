import React from 'react';

import type { ButtonProps, LinkTypeMap } from '@mui/material';

import { Button } from '@mui/material';

export interface ExternalButtonLinkProps
  extends Omit<ButtonProps<LinkTypeMap['defaultComponent']>, 'target' | 'component'> {
  href: ButtonProps['href']
}

export const ExternalButtonLink = ({ children, ...props }: ExternalButtonLinkProps) => {
  return (
    <Button {...props} component={'a'} target={'_blank'}>
      {children}
    </Button>
  );
};
