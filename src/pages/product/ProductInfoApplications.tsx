import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, useTheme } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';

import type { ApplicationId } from '~/types';
import { DbContext } from '~/providers';

export type ProductInfoApplicationsProps = {
  applicationIds: ApplicationId[];
};

export const ProductInfoApplications = ({ applicationIds }: ProductInfoApplicationsProps) => {
  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  return (
    <>
      <Typography variant={'overline'}>Applications</Typography>

      <List disablePadding>
        {applicationIds.map(applicationId => (
          <ListItem key={applicationId} disablePadding>
            <ListItemIcon sx={{ minWidth: theme.spacing(1) }}>
              <ArrowRightIcon />
            </ListItemIcon>

            <ListItemText>{db.applications[applicationId]}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
