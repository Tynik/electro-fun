import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Container,
  Alert
} from '@material-ui/core';
import { Loader } from '../components';

export const useStaticErrors = ({ showReturnToMain } = { showReturnToMain: true }) => {
  const [errors, setErrors] = React.useState<string[]>([]);

  const printErrors = React.useCallback(() => {
    if (!errors.length) {
      return <Loader/>
    }
    return (
      <Container sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Alert severity={'error'}>
          {errors.map(error => <div key={error}>{error}</div>)}
        </Alert>

        {showReturnToMain && (
          <Link to={'/'} component={RouterLink}>Вернуться на главную</Link>
        )}
      </Container>
    );
  }, [errors]);

  return {
    errors,
    setErrors,
    printErrors
  };
};
