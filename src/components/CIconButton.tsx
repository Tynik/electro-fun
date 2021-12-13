import React from 'react';

import type { IconButtonProps, BadgeProps } from '@material-ui/core';

import { IconButton, Badge } from '@material-ui/core';

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
    <IconButton
      color={'inherit'}
      {...rest}
    >
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
