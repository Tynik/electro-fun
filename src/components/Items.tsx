import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, Card, Button, CardActionArea, CardHeader } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import type { Item, Items } from '~/types';

import { DbContext } from '~/contexts';
import { NO_IMAGE } from '~/constants';
import { CCardMedia } from '~/components';

export const getItemMainImageSrc = (item: Item) => {
  if (!item.images || !item.images.length) {
    return NO_IMAGE;
  }
  return item.images[0].src;
};

export type ItemsListProps = {
  items: Items;
};

export const ItemsList = ({ items }: ItemsListProps) => {
  const navigate = useNavigate();

  const { isNextPage, loadNextPage } = React.useContext(DbContext);

  const onItemKeyDown = (url: string, e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      navigate(url);
    }
  };

  return (
    <Grid role={'list'} spacing={2} justifyContent={'center'} container>
      {items.map(item => (
        <Grid key={item.id} role={'listitem'} sx={{ maxWidth: '345px', width: '100%' }} item>
          <Card
            sx={{ width: '100%' }}
            onKeyDown={e => onItemKeyDown(`/item/${item.id}`, e)}
            tabIndex={0}
          >
            <CardActionArea component={RouterLink} to={`/item/${item.id}`} hrefLang="en">
              <CardHeader
                title={item.title}
                subheader={item.subtitle}
                titleTypographyProps={{ variant: 'subtitle1' }}
                subheaderTypographyProps={{ variant: 'subtitle2' }}
              />

              <CCardMedia src={getItemMainImageSrc(item)} alt={item.title} />
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      {items.length > 0 && (
        <Grid xs={12} sx={{ textAlign: 'center' }} item>
          <Button
            onClick={loadNextPage}
            disabled={!isNextPage()}
            startIcon={<ExpandMoreIcon />}
            variant={'outlined'}
          >
            Show More
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
