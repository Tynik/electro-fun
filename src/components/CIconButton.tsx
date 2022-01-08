import React from 'react';

import type { IconButtonProps, BadgeProps } from '@mui/material';

import { IconButton, Badge } from '@mui/material';

export type CIconButtonProps = IconButtonProps & {
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

  return (
    <IconButton {...rest}>
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
