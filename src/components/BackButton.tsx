import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';

export const BackButton = () => {
  const history = useHistory();

  return (
    <Button
      size={'small'}
      startIcon={<ArrowBackIcon/>}
      onClick={() => history.goBack()}
    >Назад</Button>
  );
};
