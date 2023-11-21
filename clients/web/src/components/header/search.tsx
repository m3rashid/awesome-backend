import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Modal } from 'antd';
import React from 'react';

import useSearch from './useSearch';

const Search: React.FC = () => {
  const {
    state,
    onSelect,
    openModal,
    closeModal,
    autoCompleteRef,
    onSearchTextChange,
  } = useSearch();

  return (
    <div className='w-8 sm:w-96'>
      <div
        onClick={openModal}
        className='w-full h-[30px] border-[1px] rounded-full sm:rounded-md cursor-pointer flex items-center justify-center sm:justify-normal sm:pl-2'
      >
        <SearchOutlined style={{ fontSize: 16, margin: 0, padding: 0 }} />
      </div>

      <Modal
        footer={null}
        closeIcon={<></>}
        onCancel={closeModal}
        open={state.modalOpen}
      >
        <AutoComplete
          autoFocus
          size='large'
          bordered={false}
          onSelect={onSelect}
          className='w-full text-lg'
          ref={autoCompleteRef as any}
          onChange={onSearchTextChange}
          placeholder='Search anything ...'
          value={state.searchText}
          options={state.data.options}
        />
      </Modal>
    </div>
  );
};

export default Search;
