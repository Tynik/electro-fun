import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Card,
  Button,
  CardActionArea,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { Item } from '../types';
import { DbContext } from '../context';
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

export type ItemsProps = {
  items: Item[]
}

export const Items = ({ items }: ItemsProps) => {
  const { isNextDbPart, loadNextDbPart } = React.useContext(DbContext);

  return (
    <Grid spacing={2} container>
        {items.map(item => (
          <Grid key={item.title} xs={12} sm={6} lg={4} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea
                component={RouterLink}
                to={`/item/${generateItemId(item.title)}`}
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

        <Grid xs={12} sx={{ textAlign: 'center' }} item>
          <Button
            onClick={loadNextDbPart}
            disabled={!isNextDbPart()}
            startIcon={<ExpandMoreIcon/>}
            variant={'outlined'}>Показать больше</Button>
        </Grid>
      </Grid>
  );
};
