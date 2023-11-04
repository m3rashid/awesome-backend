import { Spin } from 'antd';
import React from 'react';
export type LoaderProps = {
  //
};

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div>
      <Spin spinning />
    </div>
  );
};

export default Loader;
