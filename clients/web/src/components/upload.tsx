// ERROR

// import '@uppy/core/dist/style.min.css';
// import '@uppy/status-bar/dist/style.min.css';

// import { InboxOutlined } from '@ant-design/icons';
// import { baseUrl } from '@awesome/shared/helpers/service';
// import { useComponentId, useDidMount } from '@awesome/shared/hooks/helpers';
// import useLoading from '@awesome/shared/hooks/loading';
// import Uppy, { UppyFile } from '@uppy/core';
// import DropTarget from '@uppy/drop-target';
// import FileInput from '@uppy/file-input';
// import StatusBar from '@uppy/status-bar';
// import Tus from '@uppy/tus';
// import { Spin, Typography } from 'antd';
// import React, { useState } from 'react';

// export type DriveUploadProps = {
//   //
// };

// const DriveUpload: React.FC<DriveUploadProps> = () => {
//   const [uppyUploader, setUppyUploader] = useState<Uppy | null>(null);
//   const [uploadedFiles, setUploadedFiles] = useState<
//     Array<UppyFile & { data: File }>
//   >([]);
//   const id = useComponentId();
//   const { loading, loader } = useLoading();

//   useDidMount(() => {
//     if (uppyUploader) return;

//     const uppy = new Uppy({
//       autoProceed: true,
//       // restrictions: {},
//     });

//     uppy.use(Tus, {
//       endpoint: 'http://localhost:8080/files',
//       retryDelays: [0, 1000],
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     uppy
//       .use(DropTarget, { target: document.body })
//       .use(FileInput, { target: `#upload-input-${id}` })
//       .use(StatusBar, {
//         target: `#upload-status-${id}`,
//         showProgressDetails: true,
//       });
//     setUppyUploader(uppy);
//   }, []);

//   const removeUploadedFile = (file: UppyFile) => {
//     uppyUploader?.removeFile(file.id);
//   };

//   const openNativeFileSelector = () => {
//     document
//       .querySelector<HTMLInputElement>(
//         `#upload-input-${id} .uppy-FileInput-input`
//       )
//       ?.click();
//   };

//   return (
//     <Spin spinning={loading}>
//       <div>
//         <div id={`upload-input-${id}`} className='hidden' />
//         <div
//           id={`upload-dashboard-${id}`}
//           className='bg-gray-50 rounded-md border-dashed border-2 border-gray-300 cursor-pointer'
//           onClick={openNativeFileSelector}
//         >
//           <div className='text-center p-8'>
//             <Typography.Link>
//               <InboxOutlined size={42} className='text-5xl' />
//             </Typography.Link>
//             <Typography.Title level={4} className='m-0 p-0 mt-4'>
//               Click or drag file to this area to upload
//             </Typography.Title>
//           </div>
//         </div>
//         <div id={`upload-status-${id}`}></div>
//       </div>
//     </Spin>
//   );
// };

// export default DriveUpload;

import '@uppy/core/dist/style.min.css';

import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import React, { useEffect, useRef } from 'react';

export type DriveUploadProps = {
  //
};

const DriveUpload: React.FC<DriveUploadProps> = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const uppy = new Uppy();
    uppy.use(Tus, {
      endpoint: 'http://localhost:8080/files/',
      retryDelays: [0, 1000],
      withCredentials: true,
      addRequestId: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id='uppy-dashboard' ref={ref}>
        DriveUpload
      </div>
    </>
  );
};

export default DriveUpload;
