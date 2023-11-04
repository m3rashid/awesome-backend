import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App.tsx';
import RootContainer from './components/rootContainer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RootContainer>
        <App />
      </RootContainer>
    </RecoilRoot>
  </React.StrictMode>
);
