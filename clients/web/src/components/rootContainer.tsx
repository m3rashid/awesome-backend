import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header';

export type RootContainerProps = React.PropsWithChildren & {
  //
};

const RootContainer: React.FC<RootContainerProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Header />
      {children}
    </BrowserRouter>
  );
};

export default RootContainer;
