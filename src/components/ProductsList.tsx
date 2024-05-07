import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, Card, Button, CardActionArea, CardHeader } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import type { Product } from '~/types';

import { DbContext } from '~/providers';
import { NO_IMAGE } from '~/constants';
import { CCardMedia } from '~/components';

const getProductMainImageSrc = (item: Product) => {
  if (!item.images || !item.images.length) {
    return NO_IMAGE;
  }

  const mainImageSrc = item.images[0].src;

  return mainImageSrc.startsWith('http') ? mainImageSrc : `/assets/photos/${mainImageSrc}`;
};

export type ProductsListProps = {
  products: Product[];
};

export const ProductsList = ({ products }: ProductsListProps) => {
  const navigate = useNavigate();

  const { isNextPage, loadNextPage } = React.useContext(DbContext);

  const onItemKeyDown = (url: string, e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      navigate(url);
    }
  };

  return (
    <Grid role="list" spacing={2} justifyContent="center" container>
      {products.map(item => (
        <Grid key={item.id} role="listitem" sx={{ maxWidth: '345px', width: '100%' }} item>
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

              <CCardMedia src={getProductMainImageSrc(item)} alt={item.title} />
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      {products.length > 0 && (
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
