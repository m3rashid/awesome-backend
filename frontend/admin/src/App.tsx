import { Spinner } from '@fluentui/react-components';
import { lazy, Suspense } from 'react';
import { RecoilRoot } from 'recoil';

const Init = lazy(() => import('./components/atoms/init'));

function App() {
  return (
    <Suspense fallback={<Spinner size='extra-large' />}>
      <RecoilRoot>
        <Init />
      </RecoilRoot>
    </Suspense>
  );
}

export default App;
