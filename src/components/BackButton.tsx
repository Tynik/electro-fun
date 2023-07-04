import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

export const BackButton = () => {
  const history = useHistory();

  return (
    <Button size={'small'} startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
      Back
    </Button>
  );
};
