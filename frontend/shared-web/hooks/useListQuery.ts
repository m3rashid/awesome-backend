import { Method } from 'axios';
import { useEffect, useState } from 'react';

import { service } from '../utils/service';

type PaginationOptions = { currentPage: number; limit: number };

type ListQueryProps = {
  url: string;
  method?: Method;
  searchOptions?: Record<string, any>;
  populate?: string[];
  initialPaginationOptions?: PaginationOptions;
};

const useListQuery = ({
  url,
  method,
  populate,
  searchOptions,
  initialPaginationOptions,
}: ListQueryProps) => {
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>(
    {
      currentPage: initialPaginationOptions?.currentPage || 1,
      limit: initialPaginationOptions?.limit || 10,
    }
  );

  const onPaginationOptionChange = (paginationOptions: PaginationOptions) => {
    setPaginationOptions(paginationOptions);
  };

  const [res, setRes] = useState<any | null>(null);
  const listService = service(url, { method });

  const getData = async () => {
    const { data } = await listService({
      data: {
        searchOptions: { ...searchOptions },
        populate: populate || [],
        paginationOptions: {
          limit: paginationOptions.limit,
          page: paginationOptions.currentPage,
        },
      },
    });
  };

  useEffect(() => {
    getData().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationOptions.currentPage, paginationOptions.limit]);

  return {
    docs: res?.docs,
    onPaginationOptionChange,
  };
};

export default useListQuery;
