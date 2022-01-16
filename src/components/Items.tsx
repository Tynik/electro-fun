import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  Button,
  CardActionArea,
  CardHeader
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import type { ItemT, ItemsT } from '~/types';

import { DbContext } from '~/contexts';
import { NO_IMAGE } from '~/constants';
import { CCardMedia } from '~/components';

export const getItemMainImageSrc = (item: ItemT) => {
  if (!item.images || !item.images.length) {
    return NO_IMAGE;
  }
  return item.images[0].src;
};

export type ItemsProps = {
  items: ItemsT
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
    <Grid role={'list'} spacing={2} justifyContent={'center'} container>
      {items.map(item => (
        <Grid
          key={item.id}
          role={'listitem'}
          sx={{ maxWidth: '345px', width: '100%' }}
          item
        >
          <Card
            sx={{ width: '100%' }}
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
                alt={item.title}
              />
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      {items.length > 0 && (
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
      )}
    </Grid>
  );
};
