import React from 'react';
import {RecoilRoot} from 'recoil';
import Routes from './routes';

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  );
};

export default App;
