import React from 'react';

import { SearchResultsPage } from '~/pages';
import { DbContext } from '~/contexts';
import { useJsonDbSearch, useCurrentCategory } from '~/hooks';
import { getIcon } from '~/utils';

import { Loader } from './Loader';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';

export const Category = () => {
  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useJsonDbSearch(db, loadNextDbPart);

  const category = useCurrentCategory();

  React.useEffect(() => {
    if (category) {
      search({ categoryId: category.id })
    }
  }, [category]);

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
