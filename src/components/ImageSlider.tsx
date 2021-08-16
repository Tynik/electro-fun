import React from 'react';
import {
  Box,
  Modal,
  styled,
  CircularProgress,
  useTheme
} from '@material-ui/core';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { CImage } from './CImage';
import { ItemImage } from '../types';
import { Typography } from '@material-ui/core';

const CustomCarousel = styled(Carousel)(({ theme }) => (
  {
    '& > .carousel img': {
      pointerEvents: 'auto'
    },
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
  images: ItemImage[]
  height: string
}

export const ImageSlider = (props: ImageSliderProps) => {
  const { images, height } = props;

  const theme = useTheme();

  const [inLoading, setInLoading] = React.useState(images.length);
  const [photo, setPhoto] = React.useState<ItemImage>(null);

  const onImageClick = (image: ItemImage, index: number) => {
    setPhoto(image);
  };

  return (
    <>
      {inLoading > 0 && (
        <div
          aria-busy={true}
          aria-live={'polite'}
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress/>
        </div>
      )}

      <CustomCarousel
        theme={theme}
        sx={{ display: inLoading > 0 ? 'none' : 'block' }}
        renderThumbs={(children) =>
          children.map((child: any) => {
            const props = child.props.children.props;
            return <img
              key={`${props.key}-thumb`}
              src={props.src}
              alt={props.alt}
              title={props.alt}
            />;
          })
        }
        autoPlay={false}
        showStatus={false}
        infiniteLoop
      >
        {images.map((image, index) => (
          <div
            key={`image-${index}`}
            style={{ height: height, cursor: 'zoom-in' }}
            onClick={() => onImageClick(image, index)}
          >
            <CImage
              src={image.src}
              alt={image.alt}
              style={{
                height: '100%',
                objectFit: 'cover'
              }}
              onLoad={() => setInLoading((inLoading) => --inLoading)}
            />
          </div>
        ))}
      </CustomCarousel>

      {photo && (
        <Modal
          open={true}
          onClose={() => setPhoto(null)}
        >
          <Box sx={{
            maxHeight: `calc(100% - ${theme.spacing(4)})`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            boxShadow: 24,
            overflow: 'scroll',
            p: 1
          }}>
            <Typography variant={'subtitle1'}>{photo.alt}</Typography>

            <img
              src={photo.src}
              alt={''}
              onClick={() => setPhoto(null)}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                cursor: 'zoom-out'
              }}/>
          </Box>
        </Modal>
      )}
    </>
  );
};
