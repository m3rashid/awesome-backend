import { Dropdown, Option, useId } from '@fluentui/react-components';
import { Search20Regular } from '@fluentui/react-icons';
import React from 'react';

import useSearch from './useSearch';

const Search: React.FC = () => {
  const dropdownId = useId('dropdown-default');
  const { options } = useSearch();

  return (
    <div className='w-8 sm:w-96'>
      <Dropdown
        multiselect={false}
        style={{ width: '100%' }}
        aria-labelledby={dropdownId}
        expandIcon={<Search20Regular />}
        placeholder='Search anything on the platform'
      >
        {options.map((option) => (
          <Option key={option.id}>{option.name}</Option>
        ))}
      </Dropdown>
    </div>
  );
};

export default Search;
