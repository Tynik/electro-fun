import React from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Breadcrumbs,
  Link,
  Typography,
  useTheme
} from '@material-ui/core';
import {
  Home as HomeIcon
} from '@material-ui/icons';
import { DbContext } from '../context';
import { useDbSearch } from '../hooks';
import { getIcon } from '../utils';
import { Items } from './Items';

export const Category = () => {
  const theme = useTheme();
  const { categoryId } = useParams<{ categoryId: string }>();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useDbSearch(db, loadNextDbPart);

  React.useEffect(() => {
    search({ categoryId: +categoryId });
  }, [categoryId]);

  if (!foundItems) {
    return <></>;
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: theme.spacing(2) }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to={'/'}
          component={RouterLink}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit"/>
          Electro Fun
        </Link>

        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          {getIcon(db.categories[categoryId].icon, { sx: { mr: 0.5 }, fontSize: 'inherit' })}
          {db.categories[categoryId].name}
        </Typography>
      </Breadcrumbs>

      <Items items={foundItems}/>
    </Container>
  );
};
