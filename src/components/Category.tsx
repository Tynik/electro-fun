import React from 'react';
import { useParams } from 'react-router-dom';
import { Items } from '../pages';
import { DbContext } from '../context';
import { useJsonDbSearch } from '../hooks';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';
import { getIcon } from '../utils';

export const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useJsonDbSearch(db, loadNextDbPart);

  React.useEffect(() => {
    search({ categoryId: +categoryId });
  }, [categoryId]);

  const category = React.useMemo(() => {
    const convertedCategoryId = +categoryId;

    return db.categories.find(category => category.id === convertedCategoryId);
  }, [categoryId]);

  if (!foundItems) {
    return <></>;
  }

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem icon={getIcon(category.icon)} final>
          {category.name}
        </BreadcrumbItem>
      </Breadcrumbs>

      <Items items={foundItems}/>
    </>
  );
};
