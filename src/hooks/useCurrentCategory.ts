import { useParams } from 'react-router-dom';

import { useCategory } from '~/hooks';

export const useCurrentCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  return useCategory(+categoryId);
};
