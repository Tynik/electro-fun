import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

export const BackButton = () => {
  return (
    <Button size={'small'} startIcon={<ArrowBackIcon />} onClick={() => history.back()}>
      Back
    </Button>
  );
};
