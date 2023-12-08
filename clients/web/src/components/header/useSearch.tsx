import { Resource } from '@awesome/shared/types/schema';
import { useCallback, useState } from 'react';

const useSearch = () => {
  const [options, setOptions] = useState<Resource[]>([
    {
      id: 1,
      name: 'test',
      description: 'asdfasdfasdf',
      resourceId: 3,
      resourceType: 'asdfasd',
    },
  ]);

  const search = useCallback(() => {}, []);

  return {
    search,
    options,
  };
};

export default useSearch;
