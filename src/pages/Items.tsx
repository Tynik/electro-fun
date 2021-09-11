import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  Button,
  CardActionArea,
  CardHeader
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { Item } from '../types';
import { DbContext } from '../context';
import { NO_IMAGE } from '../constants';
import { CCardMedia } from '../components';

export const getItemMainImageSrc = (item: Item) => {
  if (!item.images || !item.images.length) {
    return NO_IMAGE;
  }
  return item.images[0].src;
};

export type ItemsProps = {
  items: Item[]
}

export const Items = ({ items }: ItemsProps) => {
  const history = useHistory();

  const { isNextPage, loadNextPage } = React.useContext(DbContext);

  const onItemKeyPress = (url: string, e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      history.push(url);
    }
  };

  return (
    <Grid role={'list'} spacing={2} container>
      {items.map(item => (
        <Grid key={item.id} role={'listitem'} xs={12} sm={6} lg={4} item>
          <Card
            sx={{ maxWidth: '345px', width: '100%' }}
            onKeyPress={(e) =>
              onItemKeyPress(`/item/${item.id}`, e)
            }
            tabIndex={0}
          >
            <CardActionArea
              component={RouterLink}
              to={`/item/${item.id}`}
              hrefLang={item.lang}
            >
              <CardHeader
                title={item.title}
                subheader={item.subtitle}
                titleTypographyProps={{ variant: 'subtitle1' }}
                subheaderTypographyProps={{ variant: 'subtitle2' }}
              />

              <CCardMedia
                src={getItemMainImageSrc(item)}
                alt={item.title}/>
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      <Grid xs={12} sx={{ textAlign: 'center' }} item>
        <Button
          onClick={loadNextPage}
          disabled={!isNextPage()}
          startIcon={<ExpandMoreIcon/>}
          variant={'outlined'}
        >
          Показать больше
        </Button>
      </Grid>
    </Grid>
  );
};
