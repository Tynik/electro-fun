import React from 'react';
import {
  Typography,
  AvatarGroup,
  Avatar
} from '@mui/material';

import type { ItemDriverT } from '~/types';

import { ExternalLink } from '~/components';
import { getItemDriverAvatarSrc } from '~/utils';

export type ItemInfoDriversProps = {
  drivers: ItemDriverT[]
}

export const ItemInfoDrivers = ({ drivers }: ItemInfoDriversProps) => {
  return (
    <>
      <Typography variant={'overline'}>
        Драйверы
      </Typography>

      <AvatarGroup
        max={10}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {drivers.map(driver => (
          <ExternalLink
            key={driver.name}
            href={driver.url}
            hrefLang={'en'}
            title={driver.name}
            sx={{ textDecoration: 'none' }}
            itemType={'https://schema.org/Person'}
            itemProp={'contributor'}
            itemScope
          >
            <meta itemProp={'name'} content={driver.name}/>

            <Avatar
              alt={driver.name}
              src={getItemDriverAvatarSrc(driver.src)}
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
