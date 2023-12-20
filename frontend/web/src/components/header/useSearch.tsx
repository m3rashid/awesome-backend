import resourceTypes from '@awesome/shared/constants/resourceTypes';
import { debounce } from 'lodash-es';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { service } from '@awesome/shared-web/utils/service';

const resourceTypeToUrl: Record<keyof typeof resourceTypes, string> = {
  users: '/app/community/profile/:resourceId',
  posts: '/app/community/posts/:resourceId',
  community_groups: '/app/community/chats/:resourceId',
  forms: '/app/forms/:resourceId',
  projects: '/app/projects/:resourceId',
};

const useSearch = () => {
  const [options, setOptions] = useState<any[]>([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getResources = useCallback(
    debounce(async (value: string) => {
      if (!value) return;
      try {
        const { data } = await service('/api/anonymous/search', {
          method: 'POST',
        })({ data: { text: value } });
        const resources = data.resources.map((resource: any) => ({
          ...resource,
          url: resourceTypeToUrl[
            resource.resourceType as keyof typeof resourceTypes
          ]?.replace(':resourceId', resource.resourceId),
        }));
        setOptions(resources);
      } catch (err: any) {
        console.log(err);
      } finally {
        //
      }
    }, 300),
    []
  );

  const onOptionClick = (url: string) => {
    setSearchText('');
    navigate(url);
  };

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    console.log(searchText);
    getResources(e.target.value);
  };

  return {
    options,
    searchText,
    onOptionClick,
    onSearchTextChange,
  };
};

export default useSearch;
