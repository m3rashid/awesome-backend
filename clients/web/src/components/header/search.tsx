import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Option,
  Text,
} from '@fluentui/react-components';
import { Search20Regular } from '@fluentui/react-icons';
import React from 'react';

import useSearch from './useSearch';

const Search: React.FC = () => {
  const {
    options,
    searchText,
    dialogOpen,
    setDialogOpen,
    onOptionClick,
    onSearchTextChange,
  } = useSearch();

  return (
    <div className='w-8 sm:w-96'>
      <Dialog
        open={dialogOpen}
        onOpenChange={(_, { open }) => setDialogOpen(open)}
      >
        <DialogTrigger disableButtonEnhancement>
          <Button className='w-full' icon={<Search20Regular />}>
            <Text className='text-gray-400'>
              Search anything on the platform
            </Text>
          </Button>
        </DialogTrigger>

        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              <Field>
                <Input
                  className='mb-4'
                  value={searchText}
                  onChange={onSearchTextChange}
                  contentAfter={<Search20Regular />}
                  placeholder='Search anything on the platform'
                />
              </Field>
            </DialogTitle>

            <DialogContent>
              {options.length > 0 ? (
                options.map((option) => (
                  <Option
                    key={option.id}
                    onClick={() => onOptionClick(option.url)}
                  >
                    {option.name}
                  </Option>
                ))
              ) : searchText ? (
                <Text>No results found</Text>
              ) : null}
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default Search;
