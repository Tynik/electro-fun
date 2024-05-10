import React from 'react';
import { Typography, Box, Chip, useTheme } from '@mui/material';

import type { Product } from '~/types';

import { InternalLink } from '~/components';
import { getIcon } from '~/utils';
import { useCategory } from '~/hooks';

export type ProductInfoHeaderProps = {
  product: Product;
};

export const ProductInfoHeader = ({ product }: ProductInfoHeaderProps) => {
  const theme = useTheme();

  const category = useCategory(product.categoryId);
  if (!category) {
    return null;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
          itemType={'https://schema.org/BreadcrumbList'}
          itemScope
        >
          <Typography
            variant="subtitle1"
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
            itemScope
          >
            <InternalLink
              underline="hover"
              startIcon={getIcon(category.icon)}
              endIcon={getIcon('doubleArrow')}
              to={`/category/${category.id}`}
              itemProp="item"
            >
              <span itemProp="name">{category.name}</span>
            </InternalLink>

            <meta itemProp="position" content="1" />
          </Typography>

          <Typography
            variant="h5"
            role="heading"
            aria-level={1}
            sx={{ marginLeft: theme.spacing(1) }}
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
            itemScope
          >
            <span itemProp="name">{product.title}</span>

            <meta itemProp="position" content="2" />
          </Typography>
        </Box>

        {product.original === false && (
          <Chip
            size="small"
            label="not original"
            color="info"
            sx={{ marginLeft: theme.spacing(1) }}
          />
        )}
      </Box>

      {/*{item.rating >= 0 && (*/}
      {/*  <Box sx={{ marginLeft: 1, display: 'flex' }}>*/}
      {/*    {[...(new Array(5))].map((value, index) => (*/}
      {/*      <span key={index} style={{ display: 'flex' }}>*/}
      {/*      {getIcon(getItemRatingIconName(item, index))}*/}
      {/*    </span>*/}
      {/*    ))}*/}
      {/*  </Box>*/}
      {/*)}*/}

      <Typography
        variant="subtitle1"
        role="heading"
        aria-level={2}
        sx={{ marginLeft: theme.spacing(3) }}
      >
        {product.subtitle}
      </Typography>
    </>
  );
};
