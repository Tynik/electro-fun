import React from 'react';

import type { IconButtonProps, BadgeProps } from '@mui/material';

import {
  IconButton,
  Badge,
} from '@mui/material';

import { useUpMediaQuery } from '~/hooks';

export type CIconButtonProps = Omit<IconButtonProps, 'size'> & {
  badgeContent?: BadgeProps['badgeContent']
  badgeColor?: BadgeProps['color']
  icon: React.ReactElement
}

const CIconButton = (props: CIconButtonProps) => {
  const {
    badgeContent,
    badgeColor,
    icon,
    ...rest
  } = props;

  const smMatch = useUpMediaQuery('sm');

  return (
    <IconButton {...rest} size={smMatch ? 'medium' : 'small'}>
      {badgeContent !== undefined ? (
        <Badge
          badgeContent={badgeContent}
          color={badgeColor || 'error'}
        >
          {icon}
        </Badge>
      ) : (
        <>{icon}</>
      )}
    </IconButton>
  )
}

export default CIconButton;
