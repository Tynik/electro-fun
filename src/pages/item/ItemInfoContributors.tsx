import React from 'react';
import {
  Typography,
  AvatarGroup,
  Avatar
} from '@mui/material';

import type { ItemContributorT } from '~/types';

import { ExternalLink } from '~/components';
import { getItemContributorAvatarSrc } from '~/utils';

export type ItemInfoContributorsProps = {
  contributors: ItemContributorT[]
}

export const ItemInfoContributors = ({ contributors }: ItemInfoContributorsProps) => {
  return (
    <>
      <Typography variant={'overline'}>
        Контрибьюторы
      </Typography>

      <AvatarGroup
        max={10}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {contributors.map(contributor => (
          <ExternalLink
            key={contributor.name}
            href={contributor.url}
            hrefLang={'en'}
            title={contributor.name}
            sx={{ textDecoration: 'none' }}
            itemType={'https://schema.org/Person'}
            itemProp={'contributor'}
            itemScope
          >
            <meta itemProp={'name'} content={contributor.name}/>

            <Avatar
              alt={contributor.name}
              src={getItemContributorAvatarSrc(contributor.src)}
              imgProps={{
                itemProp: 'image'
              }}
            />
          </ExternalLink>
        ))}
      </AvatarGroup>
    </>
  );
};
