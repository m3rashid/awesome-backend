import { Card } from '@fluentui/react-components';
import React from 'react';

const WidgetContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Card className='w-full flex-grow max-w-xl min-w-fit'>{children}</Card>
  );
};

export default WidgetContainer;
