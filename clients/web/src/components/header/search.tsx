import { Combobox, Option } from '@fluentui/react-components';
import { Search20Regular } from '@fluentui/react-icons';
import React from 'react';

import useSearch from './useSearch';

const Search: React.FC = () => {
  const { options, searchText, onOptionClick, onSearchTextChange } =
    useSearch();

  return (
    <div className='w-8 sm:w-96'>
      <Combobox
        value={searchText}
        onChange={onSearchTextChange}
        expandIcon={<Search20Regular />}
        style={{ width: '100%' }}
        placeholder='Search anything on the platform'
        onOptionSelect={(_, data) => onOptionClick(data.optionValue || '')}
      >
        {options.map((option) => (
          <Option key={option.id} value={option.url}>
            {option.name}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

export default Search;
