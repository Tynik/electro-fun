import React from 'react';

import { SearchResultsPage } from '~/pages';
import { useCurrentCategoryItems } from '~/hooks';
import { getIcon } from '~/utils';

import { Loader } from './Loader';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';

export const Category = () => {
  const { category, foundItems } = useCurrentCategoryItems();

  if (!foundItems) {
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
