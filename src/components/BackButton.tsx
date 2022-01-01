import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

export const BackButton = () => {
  const history = useHistory();

  return (
    <Button
      size={'small'}
      startIcon={<ArrowBackIcon/>}
      onClick={() => history.goBack()}
    >
      Назад
    </Button>
  );
};
