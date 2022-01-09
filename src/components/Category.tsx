import React from 'react';
import { useParams } from 'react-router-dom';

import { SearchResultsPage } from '~/pages';
import { DbContext } from '~/contexts';
import { useJsonDbSearch, useCategory } from '~/hooks';
import { getIcon } from '~/utils';

import { Loader } from './Loader';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';

export const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useJsonDbSearch(db, loadNextDbPart);

  const category = useCategory(+categoryId);

  React.useEffect(() => {
    search({ categoryId: +categoryId });
  }, [categoryId]);

  if (!foundItems || !category) {
    return <Loader/>;
  }

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem icon={getIcon(category.icon)} final>
          {category.name}
        </BreadcrumbItem>
      </Breadcrumbs>

      <SearchResultsPage items={foundItems}/>
    </>
  );
};
