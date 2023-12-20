import { Spinner } from '@fluentui/react-components';
import React from 'react';

export type LoaderProps = {
  //
};

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div>
      <Spinner size='extra-large' />
    </div>
  );
};

export default Loader;
