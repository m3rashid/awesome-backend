import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import Dashboard from '@uppy/dashboard';

import React, { useEffect, useRef, useState } from 'react';
import { baseUrl } from '@awesome/shared/helpers/service';

export type DriveUploadProps = {
  //
};

const DriveUpload: React.FC<DriveUploadProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [uppy, setUppy] = useState<Uppy | null>();

  useEffect(() => {
    if (!ref.current || uppy) return;
    const newUppy = new Uppy();

    newUppy
      .use(Dashboard, { inline: true, target: '#uppy-dashboard' })
      .use(Tus, {
        endpoint: baseUrl + '/api/files/',
        retryDelays: [0, 1000],
        addRequestId: true,
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem('awesome:token') || undefined
          }`,
        },
      });
    setUppy(newUppy);

    return () => {
      newUppy.close();
    };
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
