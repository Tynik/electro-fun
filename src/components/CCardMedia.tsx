import React, { SyntheticEvent, ImgHTMLAttributes } from 'react';
import {
  CardMedia,
  CircularProgress
} from '@material-ui/core';

export interface CCardMediaProps extends Omit<ImgHTMLAttributes<any>, 'onLoad'> {
}

export const CCardMedia = (props: CCardMediaProps) => {
  const [imageIsLoaded, setImageIsLoaded] = React.useState(false);

  const onImageLoad = (e: SyntheticEvent) => {
    if ((e.target as HTMLImageElement).complete) {
      setImageIsLoaded(true);
    }
  };

  return (
    <div style={{
      height: '250px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {!imageIsLoaded && (
        <CircularProgress/>
      )}

      <CardMedia
        sx={{
          height: '100%',
          objectFit: 'cover',
          display: imageIsLoaded ? 'block' : 'none'
        }}
        component={'img'}
        {...props}
        onLoad={onImageLoad}
      />
    </div>
  );
};
