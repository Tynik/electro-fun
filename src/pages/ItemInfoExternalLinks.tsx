import {
  Typography,
  List,
  ListItem,
  Icon,
  ListItemText
} from '@material-ui/core';

import { ExternalLink } from '../components';
import React from 'react';
import { Item } from '../types';

export type ItemInfoExternalLinksProps = {
  item: Item
}

export const ItemInfoExternalLinks = ({ item }: ItemInfoExternalLinksProps) => {
  return (
    <>
      <Typography variant={'overline'}>
        Ссылки на внешние ресурсы
      </Typography>

      <List disablePadding>
        {item.externalLinks.map(externalResource => (
          <ListItem key={externalResource.name} disablePadding>
            {externalResource.icon && (
              <Icon
                fontSize={'small'}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <img
                  src={`/icons/${externalResource.icon}`}
                  alt={externalResource.iconAlt}
                  title={externalResource.iconAlt}
                  width={16}
                  height={16}/>
              </Icon>
            )}
            <ListItemText>
              <ExternalLink
                href={externalResource.url}
                hrefLang={externalResource.lang}
              >
                {externalResource.name}
              </ExternalLink>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
