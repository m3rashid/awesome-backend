import React from 'react';
import {RecoilRoot} from 'recoil';
import {initialize} from 'react-native-clarity';
import {GluestackUIProvider} from '@gluestack-ui/themed';

import Routes from './src/routes';
import {config} from './config/gluestack-ui.config';

// Initialize Clarity
initialize('jt2n336gtx');

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
