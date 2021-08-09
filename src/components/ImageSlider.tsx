import React from 'react';
import {
  CircularProgress,
  styled,
  useTheme
} from '@material-ui/core';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { ItemImages } from '../types';
import { CImage } from './CImage';

const CustomCarousel = styled(Carousel)(({ theme }) => (
  {
    '& > .carousel .thumbs-wrapper': {
      margin: theme.spacing(1),
      '& > ul': {
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        '& > li': {
          cursor: 'pointer'
        }
      }
    }
  }
));

export type ImageSliderProps = {
  images: ItemImages
  height: string
}

export const ImageSlider = ({ images, height }: ImageSliderProps) => {
  const theme = useTheme();

  const [inLoading, setInLoading] = React.useState(images.length);

  return (
    <>
      {inLoading > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress/>
        </div>
      )}

      <CustomCarousel
        theme={theme}
        sx={{ display: inLoading > 0 ? 'none' : 'block' }}
        renderThumbs={(children) =>
          children.map((child: any) => {
            const props = child.props.children.props;
            return <img key={`${props.key}-thumb`} src={props.src} alt={props.alt}/>;
          })
        }
        showStatus={false}
        emulateTouch
        infiniteLoop
      >
        {images.map((image, index) => (
          <div key={`image-${index}`} style={{ height: height }}>
            <CImage
              src={typeof image === 'string' ? image : image.src}
              alt={typeof image === 'string' ? '' : image.alt}
              style={{
                height: '100%',
                objectFit: 'cover'
              }}
              onLoad={() => setInLoading((inLoading) => --inLoading)}
            />
          </div>
        ))}
      </CustomCarousel>
    </>
  );
};
