import '@uppy/core/dist/style.min.css';
import '@uppy/status-bar/dist/style.min.css';

import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { baseUrl } from '@awesome/shared/helpers/service';
import {
  getRandomId,
  useComponentId,
  useDidMount,
} from '@awesome/shared/hooks/helpers';
import useLoading from '@awesome/shared/hooks/loading';
import Uppy, { UppyFile } from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import FileInput from '@uppy/file-input';
import StatusBar from '@uppy/status-bar';
import Tus from '@uppy/tus';
import { Spin, Typography } from 'antd';
import _ from 'lodash-es';
import React, { useState } from 'react';

import { service } from '../helpers/service';

export interface SelectedFile {
  id: string;
  file: DriveFile;
  error?: string | null;
}

export interface DriveFile {
  _id: string;
  name: string;
  size: number;
  type: string;
  folder: string;
  metaData: any;
  actualPath: string;

  url?: string;
  thumbnailURL: string;

  incomplete?: boolean;
}

type _DriveFileType =
  | '*'
  | 'pdf'
  | 'image'
  | 'audio'
  | 'video'
  | 'stream'
  | string;
export type DriveFileType = _DriveFileType | _DriveFileType[];

export const toFile = (obj: File | Blob): File => {
  if (obj instanceof File) return obj;
  if (obj instanceof Blob) return new File([obj], 'unknown');

  return obj;
};

export type DriveUploadProps = {
  //
};

const DriveUpload: React.FC<DriveUploadProps> = () => {
  const type: DriveFileType = 'pdf';
  const [uppy, setUppy] = useState<Uppy | null>(null);
  const { loading, loader } = useLoading();
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<UppyFile & { data: File }>
  >([]);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const id = useComponentId();

  const createStreamService = service('/api/files/patch');

  const openNativeFileSelector = () => {
    document
      .querySelector<HTMLInputElement>(
        `#upload-input-${id} .uppy-FileInput-input`
      )
      ?.click();
  };

  const handleStreamFile = loader(
    'Creating Stream',
    async (file: UppyFile, uppy: Uppy) => {
      if (uppy) {
        const {
          data: { options, driveFile },
        } = await createStreamService({
          data: {
            file: {
              offset: 0,
              id: file.id,
              metadata: file.meta,
              size: file.size,
              creation_date: file.meta.creationDate,
            },
          },
        });

        uppy.use(Tus, options);
        setTimeout(() => {
          uppy.addFile({
            ...file,
            meta: { ...file.meta, driveFile },
          });
        });
      }

      return file;
    }
  );

  useDidMount(() => {
    if (!uppy) {
      const types = _.isArray(type) ? type : [type];
      const allowedFileTypes = types.map((t) => {
        if (t === 'image') return 'image/*';
        if (t === 'video') return 'video/*';
        if (t === 'audio') return 'audio/*';
        if (t === 'pdf') return '.pdf';
        if (t === 'stream') return 'video/*';
        if (t === '*') return '*/*';
        return t;
      });

      const uppy = new Uppy({
        autoProceed: true,
        restrictions: {
          ...(allowedFileTypes.length > 0 && { allowedFileTypes }),
        },
        onBeforeFileAdded: (file) => {
          // console.log('[currentFile]', file);

          if (type === 'stream') {
            const hasBeenProcessed = !!file.meta.driveFile;
            // console.log('[hasBeenProcessed]', hasBeenProcessed);
            if (!hasBeenProcessed) {
              handleStreamFile(file, uppy).catch(console.log);
              return false;
            }
          }

          const newId = getRandomId();
          file.id = `${file.id}-${newId}`;
          file.meta = { ...file.meta, id: newId };
          // console.log('[newFile]', file);
          return file;
        },
      });

      uppy
        .use(DropTarget, { target: document.body })
        .use(FileInput, { target: `#upload-input-${id}` })
        .use(StatusBar, {
          target: `#upload-status-${id}`,
          showProgressDetails: true,
        });

      if (type !== 'stream') {
        uppy.use(Tus, {
          addRequestId: true,
          withCredentials: true,
          endpoint: `${baseUrl}/api/files/upload`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          onAfterResponse: (req, res) => {
            try {
              if (type === 'stream') return; // skip if stream

              const rawDriveFile = res.getHeader('X-Drive-File');
              const driveFile = JSON.parse(atob(rawDriveFile));

              const allFiles = uppy.getFiles();
              const file = _.find(
                allFiles,
                (f) => f?.meta?.id === driveFile?.metaData?.id
              );
              if (file) {
                uppy.setFileMeta(file.id, {
                  ...file?.meta,
                  driveFile,
                });
              }
            } catch (e) {
              console.log(e);
            }
          },
        });
      }

      uppy
        .on('file-added', (file) => {
          file.data = toFile(file.data);
          setUploadedFiles((files) => [...files, file as any]);
        })
        .on('complete', (result) => {
          const uploadedFiles: SelectedFile[] = [];
          result.successful.map((file) => {
            uploadedFiles.push({
              id: getRandomId(),
              file: {
                ...(file.meta.driveFile as DriveFile),
                incomplete: false,
              },
            });
            uppy.removeFile(file.id);
          });

          result.failed.map((file) => {
            uploadedFiles.push({
              id: getRandomId(),
              file: file.meta.driveFile as DriveFile,
              error: file.error,
            });
            uppy.removeFile(file.id);
          });

          setUploadedFiles([]);
          setFiles((p) => [...p, ...uploadedFiles]);
          if (type === 'stream') {
            const tusPlugin = uppy.getPlugin('Tus');
            if (tusPlugin) uppy.removePlugin(tusPlugin);
          }
        })
        .on('error', (error) => {
          console.error(error.stack);
        });

      setUppy(uppy);
    }
  }, []);

  const removeUploadedFile = (file: UppyFile) => {
    uppy?.removeFile(file.id);
    setUploadedFiles((files) => files.filter((f) => f.id !== file.id));
  };

  return (
    <Spin spinning={loading}>
      <div>
        <div id={`upload-input-${id}`} className='hidden' />
        <div
          id={`upload-dashboard-${id}`}
          className='bg-gray-50 rounded-sm border-dashed border-2 border-gray-300 cursor-pointer'
          onClick={openNativeFileSelector}
        >
          <div>
            {uploadedFiles.length > 0 && (
              <>
                <div className='p-8'>
                  {uploadedFiles.map((file) => (
                    <div key={file.id}>
                      <Typography.Text
                        type='danger'
                        onClick={(e) => {
                          e.stopPropagation();
                          removeUploadedFile(file);
                        }}
                      >
                        <DeleteOutlined className='mr-2' />
                      </Typography.Text>
                      <Typography.Text>{file.data.name}</Typography.Text>
                    </div>
                  ))}
                </div>
                <div className='text-center mt-4 mb-0'>
                  <Typography.Text type='secondary'>
                    Click or drag file to this area to upload
                  </Typography.Text>
                </div>
              </>
            )}
            {uploadedFiles.length === 0 && (
              <div className='text-center p-8'>
                <Typography.Link>
                  <InboxOutlined size={42} className='text-5xl' />
                </Typography.Link>
                <Typography.Title level={4} className='mt-4'>
                  Click or drag file to this area to upload
                </Typography.Title>
              </div>
            )}
          </div>
          <div id={`upload-status-${id}`}></div>
        </div>
      </div>
    </Spin>
  );
};

export default DriveUpload;
