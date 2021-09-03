import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container
} from '@material-ui/core';
import { DbContext } from '../context';
import { useDbSearch } from '../hooks';
import { Items } from './Items';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';
import { getIcon } from '../utils';

export const Category = () => {
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
      <Breadcrumbs>
        <BreadcrumbItem icon={getIcon(db.categories[categoryId].icon)} final>
          {db.categories[categoryId].name}
        </BreadcrumbItem>
      </Breadcrumbs>

      <Items items={foundItems}/>
    </Container>
  );
};
