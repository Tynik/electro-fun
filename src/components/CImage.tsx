import React from 'react';
import { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<any> {
  onLoad?: () => void
}

export const CImage = ({ onLoad, ...rest }: ImageProps) => {
  const imgRef = React.useRef(null);

  const onLoadHandler = () => {
    if (onLoad && imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  }

  return (
    <img alt={''} {...rest} ref={imgRef} onLoad={onLoadHandler}/>
  );
};
