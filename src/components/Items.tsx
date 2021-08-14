import React from 'react';
import { useHistory } from 'react-router';
import {
  Grid,
  Card,
  Container,
  CardActionArea,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';

import { Item } from '../types';
import { AppContext } from '../context';
import { generateItemId } from '../utils';
import { NO_IMAGE } from '../constants';
import { CCardMedia } from './CCardMedia';

export const getItemMainImage = (item: Item) => {
  if (!item.images || !item.images.length) {
    return NO_IMAGE;
  }
  const firstImage = item.images[0];
  return typeof firstImage === 'string' ? firstImage : firstImage.src;
};

export const Items = () => {
    const history = useHistory();

    const { db } = React.useContext(AppContext);

    const onItemClick = (item: Item, e) => {
      e.preventDefault();
      history.push(`/item/${generateItemId(item.title)}`);
    };

    return (
      <Container>
        <Grid spacing={2} container>
          {db.items.map(item => (
            <Grid key={item.title} xs={12} md={6} lg={4} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  component={'a'}
                  href={`#/item/${generateItemId(item.title)}`}
                  onClick={(e) => onItemClick(item, e)}
                >
                  <CardHeader
                    title={item.title}
                    subheader={item.subtitle || ''}
                    titleTypographyProps={{ variant: 'subtitle1' }}
                    subheaderTypographyProps={{ variant: 'subtitle2' }}
                  />

                  <CCardMedia
                    src={getItemMainImage(item)}
                    alt={item.title}/>

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >{item.content}</Typography>

                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    );
  }
;
