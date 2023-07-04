import React from 'react';
import { Container, Alert } from '@mui/material';
import { Loader, InternalLink } from '~/components';

export type UseStaticErrorsProps = {
  showReturnToMain: boolean;
};

export const useStaticErrors = (
  { showReturnToMain }: UseStaticErrorsProps = { showReturnToMain: true }
) => {
  const [errors, setErrors] = React.useState<string[]>([]);

  const printErrors = React.useCallback(() => {
    if (!errors.length) {
      return <Loader />;
    }
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Alert severity={'error'}>
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </Alert>

        {showReturnToMain && <InternalLink to={'/'}>Back to home page</InternalLink>}
      </Container>
    );
  }, [errors]);

  return {
    errors,
    setErrors,
    printErrors,
  };
};
