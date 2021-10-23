import React from 'react';
import {
  CircularProgress,
  Typography,
  useTheme
} from '@material-ui/core';

export type LoaderProps = {
  style?: Omit<React.CSSProperties, 'display' | 'justifyContent'>
  label?: string
}

export const Loader = ({ style, label }: LoaderProps) => {
  const theme = useTheme();

  return (
    <div
      aria-busy={true}
      aria-live={'polite'}
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...(style || {}),
        ...(label && { flexDirection: 'column', alignItems: 'center' })
      }}
    >
      <CircularProgress/>

      {label && (
        <Typography variant={'body2'} sx={{ marginTop: theme.spacing(2) }}>
          {label}
        </Typography>
      )}
    </div>
  );
};
