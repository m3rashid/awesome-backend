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
