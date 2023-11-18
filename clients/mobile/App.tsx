import React from 'react';
import {RecoilRoot} from 'recoil';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import Routes from './src/routes';

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <GluestackUIProvider config={config}>
        <Routes />
      </GluestackUIProvider>
    </RecoilRoot>
  );
};

export default App;
