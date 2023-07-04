import React from 'react';
import { Typography, AvatarGroup, Avatar } from '@mui/material';

import type { ItemContributor } from '~/types';

import { ExternalLink } from '~/components';
import { getItemContributorAvatarSrc } from '~/utils';

export type ItemInfoContributorsProps = {
  contributors: ItemContributor[];
};

export const ItemInfoContributors = ({ contributors }: ItemInfoContributorsProps) => {
  return (
    <>
      <Typography variant={'overline'}>Contributors</Typography>

      <AvatarGroup max={10} sx={{ display: 'flex', justifyContent: 'center' }}>
        {contributors.map(contributor => (
          <ExternalLink
            key={contributor.name}
            href={contributor.url}
            hrefLang={'en'}
            title={contributor.name}
            sx={{ textDecoration: 'none' }}
          >
            <Avatar alt={contributor.name} src={getItemContributorAvatarSrc(contributor.src)} />
          </ExternalLink>
        ))}
      </AvatarGroup>
    </>
  );
};
