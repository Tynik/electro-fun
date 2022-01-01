import React from 'react';

import type { ButtonProps } from '@mui/material';

import { Button } from '@mui/material';

import { useUpMediaQuery } from '../hooks';

export type CButtonProps = Omit<ButtonProps, 'size'> & {}

const CButton = ({ children, ...rest }: CButtonProps) => {
  const smMatch = useUpMediaQuery('sm');

  return (
    <Button {...rest} size={smMatch ? 'medium' : 'small'}>
      {children}
    </Button>
  );
};

export default CButton;
