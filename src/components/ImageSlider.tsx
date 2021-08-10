import React from 'react';
import {
  Box,
  Modal,
  styled,
  CircularProgress,
  useTheme
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { ItemImages } from '../types';
import { CImage } from './CImage';
import { ItemImage } from '../types';

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

export const ImageSlider = (props: ImageSliderProps) => {
  const { images, height } = props;

  const theme = useTheme();

  const [inLoading, setInLoading] = React.useState(images.length);
  const [photo, setPhoto] = React.useState<string>(null);

  const onImageClick = (image: string | ItemImage, index: number) => {
    setPhoto(typeof image === 'string' ? image : image.src);
  }

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
        autoPlay={false}
        showStatus={false}
        emulateTouch
        infiniteLoop
      >
        {images.map((image, index) => (
          <div
            key={`image-${index}`}
            style={{ height: height }}
            onClick={() => onImageClick(image, index)}
          >
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

      <Modal
        open={Boolean(photo)}
        onClose={() => setPhoto(null)}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 2,
        }}>
          <div style={{ textAlign: 'right' }}>
            <CloseIcon
              onClick={() => setPhoto(null)}
              sx={{ cursor: 'pointer' }}
            />
          </div>
          <img src={photo} alt={''} style={{ width: '100%' }}/>
        </Box>
      </Modal>
    </>
  );
};
