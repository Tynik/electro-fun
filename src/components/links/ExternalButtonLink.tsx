import React from 'react';

import type { ButtonProps, LinkTypeMap } from '@material-ui/core';

import { Button } from '@material-ui/core';

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
