import { Drawer, theme } from 'antd';
import React, { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '../atoms/loader';

const AppSwitchDrawerContents = lazy(() => import('./appSwitchDrawerContents'));

const AppsSvg = (props: { baseColor: string; hoverColor: string }) => {
  const [color, setColor] = useState(props.baseColor);

  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onMouseLeave={() => setColor(props.baseColor)}
      onMouseEnter={() => setColor(props.hoverColor)}
    >
      <rect width='4' height='4' rx='1' fill={color}></rect>
      <rect y='6' width='4' height='4' rx='1' fill={color}></rect>
      <rect y='12' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='6' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='6' y='6' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='6' y='12' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='12' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='12' y='6' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='12' y='12' width='4' height='4' rx='1' fill={color}></rect>
    </svg>
  );
};

const AppSwitch: React.FC = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen((p) => !p)} className='cursor-pointer'>
        <AppsSvg baseColor='gray' hoverColor={token.colorPrimary} />
      </div>

      <Drawer
        {...{
          open,
          onClose: () => setOpen((p) => !p),
          styles: {
            header: { display: 'none' },
            body: { padding: 8 },
          },
        }}
      >
        <Suspense fallback={<Loader />}>
          <AppSwitchDrawerContents
            onRouteClick={(route: string) => {
              navigate(route);
              setOpen(false);
            }}
          />
        </Suspense>
      </Drawer>
    </>
  );
};

export default AppSwitch;
