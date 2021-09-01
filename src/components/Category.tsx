import React from 'react';
import { useParams } from 'react-router-dom';
import { DbContext } from '../context';
import { useDbSearch } from '../hooks';
import { Items } from './Items';

export const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useDbSearch(db, loadNextDbPart);

  React.useEffect(() => {
    search({ categoryId: +categoryId });
  }, [categoryId]);

  if (!foundItems) {
    return <></>
  }

  return (
    <Items items={foundItems}/>
  );
};
