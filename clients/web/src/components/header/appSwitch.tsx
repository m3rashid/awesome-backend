import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Spinner,
  ToggleButton,
} from '@fluentui/react-components';
import { Apps20Regular, Dismiss24Regular } from '@fluentui/react-icons';
import React, { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppSwitchDrawerContents = lazy(() => import('./appList'));

const AppSwitch: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToggleButton
        shape='circular'
        appearance='subtle'
        icon={<Apps20Regular />}
        style={{ maxWidth: '100%' }}
        onClick={() => setIsOpen((p) => !p)}
      />

      <Drawer
        open={isOpen}
        position='end'
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader style={{ padding: 16 }}>
          <DrawerHeaderTitle
            action={
              <Button
                appearance='subtle'
                aria-label='Close'
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Apps and Services
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody style={{ paddingLeft: 12, paddingRight: 12 }}>
          <Suspense fallback={<Spinner size='extra-large' />}>
            <AppSwitchDrawerContents
              onRouteClick={(route: string) => {
                navigate(route);
                setIsOpen(false);
              }}
            />
          </Suspense>
        </DrawerBody>
      </Drawer>
    </>
  );
};

export default AppSwitch;
