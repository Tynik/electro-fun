import React from 'react';
import {
  Typography,
  AvatarGroup,
  Avatar
} from '@material-ui/core';

import { ItemDriverT } from '../types';
import { ExternalLink } from '../components';
import { getItemDriverAvatarSrc } from '../utils';

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
          >
            <Avatar
              alt={driver.name}
              src={getItemDriverAvatarSrc(driver.src)}
            />
          </ExternalLink>
        ))}
      </AvatarGroup>
    </>
  );
};
