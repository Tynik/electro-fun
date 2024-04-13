import React from 'react';
import { Typography, List, ListItem, Icon, ListItemText } from '@mui/material';

import type { ProductExternalLink } from '~/types';

import { ExternalLink } from '~/components';

export type ProductInfoExternalLinksProps = {
  externalLinks: ProductExternalLink[];
};

export const ProductInfoExternalLinks = ({ externalLinks }: ProductInfoExternalLinksProps) => {
  return (
    <>
      <Typography variant={'overline'}>Links to external resources</Typography>

      <List disablePadding>
        {externalLinks.map(externalResource => (
          <ListItem key={externalResource.name} disablePadding>
            {externalResource.icon && (
              <Icon
                fontSize={'small'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: 1,
                }}
              >
                <img
                  src={`/icons/${externalResource.icon}`}
                  alt={externalResource.iconAlt}
                  title={externalResource.iconAlt}
                  width={16}
                  height={16}
                />
              </Icon>
            )}
            <ListItemText>
              <ExternalLink href={externalResource.url} hrefLang={externalResource.lang}>
                {externalResource.name}
              </ExternalLink>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
