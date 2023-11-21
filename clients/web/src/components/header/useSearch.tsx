import { Resource } from '@awesome/shared/types/schema';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { service } from '../../helpers/service';

const renderTitle = (title: string, count: number) => (
  <div className='flex justify-between mt-5'>
    {title}
    <span>{count}</span>
  </div>
);

const renderItem = (resource: Resource) => ({
  value: resource.resourceId,
  label: (
    <div key={resource.id}>
      <p className='p-0 m-0'>{resource.name}</p>
      <p className='text-sm text-gray-600 m-0 p-0'>{resource.description}</p>
    </div>
  ),
});

const useSearch = () => {
  const navigate = useNavigate();
  const getResourcesApi = service<Resource[]>('/api/search');
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<{
    resources: Resource[];
    options: any[];
  }>({ options: [], resources: [] });
  const autoCompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      autoCompleteRef.current?.focus();
    }, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const closeModal = () => {
    setSearchText('');
    setModalOpen(false);
  };
  const openModal = () => setModalOpen(true);

  const getResources = useCallback(
    debounce(async (value) => {
      if (!value) return;
      const res = await getResourcesApi({ data: { text: value } });

      // const groupedData: Record<string, Resource[]> = {};
      // for (let i = 0; i < res.data.length; i++) {
      //   if (!groupedData[res.data[i].extension]) {
      //     groupedData[res.data[i].extension] = [];
      //   }
      //   groupedData[res.data[i].extension].push(res.data[i]);
      // }

      // const _options = Object.entries(groupedData).map(([key, values]) => ({
      //   label: (
      //     <span>{renderTitle(extensionsData[key]?.name, values.length)}</span>
      //   ),
      //   options: values.map(renderItem),
      // }));

      setData({
        resources: res.data,
        options: [],
        // options: _options
      });
    }, 500),
    []
  );

  const onSelect = (selectedRid: string) => {};

  const onSearchTextChange = (value: string) => {
    setSearchText(value);
    getResources(value);
  };

  return {
    onSelect,
    openModal,
    closeModal,
    autoCompleteRef,
    onSearchTextChange,
    state: { searchText, data, modalOpen },
  };
};

export default useSearch;
