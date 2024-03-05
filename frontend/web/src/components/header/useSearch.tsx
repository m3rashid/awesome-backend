import { service } from '@awesome/shared/utils/service';

import { debounce } from 'lodash-es';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const resourceTypeToUrl: Record<ResourceType, string> = {
  users: '/app/community/profile/:resourceId',
  posts: '/app/community/posts/:resourceId',
  community_groups: '/app/community/chats/:resourceId',
  forms: '/app/forms/:resourceId',
  projects: '/app/projects/:resourceId',
  leads: '/app/crm/leads/:resourceId',
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
            resource.resourceType as ResourceType
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
