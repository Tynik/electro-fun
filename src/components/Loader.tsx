import React from 'react';
import { CircularProgress } from '@material-ui/core';

export type LoaderProps = {
  style?: Omit<React.CSSProperties, 'display' | 'justifyContent'>
}

export const Loader = ({ style }: LoaderProps = { style: null }) => {
  return (
    <div
      aria-busy={true}
      aria-live={'polite'}
      style={{
        ...(style || {}),
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <CircularProgress/>
    </div>
  );
};
