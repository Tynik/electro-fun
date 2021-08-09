import React from 'react';
import { useHistory } from 'react-router';
import {
  Grid,
  Card,
  Container,
  CardActionArea,
  CardHeader,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';

import { Item } from '../types';
import { AppContext } from '../context';
import { generateItemId } from '../utils';
import { NO_IMAGE } from '../constants';

export const getItemMainImage = (item: Item) => {
  if (!item.images || !item.images.length) {
    return NO_IMAGE;
  }
  const firstImage = item.images[0];
  return typeof firstImage === 'string' ? firstImage : firstImage.src
};

export const Items = () => {
    const { db } = React.useContext(AppContext);
    const history = useHistory();

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
                  <CardMedia
                    sx={{
                      height: 0,
                      paddingTop: '56.25%' // 16:9
                    }}
                    image={getItemMainImage(item)}
                    title={item.title}
                  />
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
                  {/*<CardActions>*/}
                  {/*  <Button onClick={() => {}}>See</Button>*/}
                  {/*</CardActions>*/}
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    );
  }
;
