import { Button, Image } from '@fluentui/react-components';
import React from 'react';
import _ from 'lodash-es';
import {
  Dismiss20Regular,
  Document20Filled,
  Document32Filled,
  DocumentCss20Filled,
  DocumentJavascript20Filled,
  DocumentPdf20Filled,
  DocumentPdf32Filled,
  Image20Filled,
  Image32Filled,
} from '@fluentui/react-icons';
import { UploadFile } from '../upload';

export const getFileIcon = (file: File) => {
  if (file.type.includes('image')) {
    return {
      small: <Image20Filled className='' />,
      large: <Image32Filled className='' />,
    };
  }
  if (file.type.includes('pdf')) {
    return {
      small: <DocumentPdf20Filled className='text-red-500' />,
      large: <DocumentPdf32Filled className='text-red-500' />,
    };
  }
  if (file.type.includes('css')) {
    return {
      small: <DocumentCss20Filled className='text-sky-500' />,
      large: <Document32Filled className='text-sky-500' />,
    };
  }
  if (file.type.includes('javascript')) {
    return {
      small: <DocumentJavascript20Filled className='text-yellow-500' />,
      large: <Document32Filled className='text-yellow-500' />,
    };
  }
  return {
    small: <Document20Filled className='text-blue-500' />,
    large: <Document32Filled className='text-blue-500' />,
  };
};

export type ShowUploadProps = {
  uploadFile: UploadFile;
  onRemove: (fileId: string) => void;
};

const ShowUpload: React.FC<ShowUploadProps> = ({ uploadFile, onRemove }) => {
  return (
    <div className='relative w-56 h-40 shadow-md rounded-sm'>
      <Button
        size='small'
        icon={<Dismiss20Regular />}
        onClick={() => onRemove(uploadFile.uniqueId)}
        className='absolute z-50 right-1 top-1 bg-red-300'
      />
      <div className='flex flex-col justify-between h-full w-full'>
        <div className='flex items-center justify-center flex-grow'>
          {uploadFile.file.type.startsWith('image') ? (
            <Image
              src={URL.createObjectURL(uploadFile.file)}
              style={{
                maxHeight: 132,
                borderTopLeftRadius: '0.125rem',
                borderTopRightRadius: '0.125rem',
              }}
            />
          ) : (
            getFileIcon(uploadFile.file).large
          )}
        </div>

        <div className='p-1 bg-blue-100 flex gap-2'>
          {getFileIcon(uploadFile.file).small}
          {_.truncate(
            uploadFile.file.name.substring(
              0,
              uploadFile.file.name.lastIndexOf('.')
            ),
            { length: 20 }
          ) +
            uploadFile.file.name.substring(
              uploadFile.file.name.lastIndexOf('.')
            )}
        </div>
      </div>
    </div>
  );
};

export default ShowUpload;
