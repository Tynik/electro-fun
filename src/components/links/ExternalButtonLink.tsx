import React from 'react';
import { Button, ButtonProps, LinkTypeMap } from '@material-ui/core';

export interface ExternalButtonLinkProps
  extends Omit<ButtonProps<LinkTypeMap['defaultComponent']>, 'target' | 'component'> {
}

export const ExternalButtonLink = ({ children, ...props }: ExternalButtonLinkProps) => {
  return (
    <Button {...props} component={'a'} target={'_blank'}>
      {children}
    </Button>
  );
};
