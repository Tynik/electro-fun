import React from 'react';
import { Typography, AvatarGroup, Avatar } from '@mui/material';

import type { ProductContributor } from '~/types';

import { ExternalLink } from '~/components';
import { getProductContributorAvatarSrc } from '~/utils';

export type ProductInfoContributorsProps = {
  contributors: ProductContributor[];
};

export const ProductInfoContributors = ({ contributors }: ProductInfoContributorsProps) => {
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
            <Avatar alt={contributor.name} src={getProductContributorAvatarSrc(contributor.src)} />
          </ExternalLink>
        ))}
      </AvatarGroup>
    </>
  );
};
