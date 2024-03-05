import { service } from '@awesome/shared/utils/service';
import {
  Button,
  Dialog,
  ButtonProps,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-components';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import ShowUpload from './atoms/uploadShow';

export type DriveUploadProps = {
  triggerButtonProps?: ButtonProps;
  driveHeader?: string;
};

export type UploadFile = {
  file: File;
  uniqueId: string;
  uploadedUrl?: string;
};

const DriveUpload: React.FC<DriveUploadProps> = ({
  driveHeader,
  triggerButtonProps,
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const uploadSingleFile = async (file: File) => {
    if (!file) return;
    const { data } = await service<{
      url: string;
      objectKey: string;
    }>('/api/drive/signed-url/put', {
      method: 'POST',
    })({ data: { fileName: file.name } });
    if (!data.url) return;

    await axios.put(data.url, {
      data: file,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const objectUrl = data.url.split('?')[0];
    console.log({ objectUrl });
  };

  const uploadFiles = async () => {
    if (files.length == 0) return;
    console.log({ files });
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((t) => t.uniqueId != fileId));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button children='Upload Files' {...triggerButtonProps} />
        </DialogTrigger>
        <DialogSurface style={{ width: '1000px', maxWidth: '90vw' }}>
          <DialogBody>
            <DialogTitle>{driveHeader || 'Upload Files'}</DialogTitle>
            <DialogContent>
              <div className='flex items-center gap-2 flex-wrap max-h-[400px] overflow-auto'>
                {files.map((uploadFile) => (
                  <ShowUpload
                    onRemove={removeFile}
                    uploadFile={uploadFile}
                    key={uploadFile.uniqueId}
                  />
                ))}
              </div>

              <input
                multiple
                className='mt-8'
                type='file'
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length == 0) return;
                  setFiles((prev) => [
                    ...prev,
                    ...Array.from(e.target.files || []).map((file) => ({
                      file,
                      uniqueId: nanoid(),
                    })),
                  ]);
                  e.target.value = '';
                }}
              />
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance='secondary'>Close</Button>
              </DialogTrigger>
              <Button appearance='primary' onClick={uploadFiles}>
                Upload
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default DriveUpload;
