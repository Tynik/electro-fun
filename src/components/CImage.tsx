import React from 'react';
import { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<any> {
  alt: string
  onLoad?: () => void;
  description?: string;
}

export const CImage = ({ onLoad, ...rest }: ImageProps) => {
  const imgRef = React.useRef(null);

  const onLoadHandler = () => {
    if (onLoad && imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  };

  return (
    <span
      itemType={'https://schema.org/ImageObject'}
      itemScope
    >
      <meta itemProp={'name'} content={rest.alt}/>

      {rest.description && (
        <meta itemProp={'description'} content={rest.description}/>
      )}

      <img
        alt={''}
        {...rest}
        ref={imgRef}
        onLoad={onLoadHandler}
        itemProp={'contentUrl'}
      />
    </span>
  );
};
