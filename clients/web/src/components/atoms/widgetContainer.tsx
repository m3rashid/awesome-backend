import { Card, Typography } from 'antd';
import React from 'react';

export type WidgetContainerProps = React.PropsWithChildren & {
  title: string;
  subtitle?: string;
  className?: string;
};

const WidgetContainer: React.FC<WidgetContainerProps> = (props) => {
  return (
    <Card className={props.className || ''}>
      <Typography.Title level={5}>{props.title}</Typography.Title>
      {props.subtitle ? (
        <Typography.Text type='secondary'>{props.subtitle}</Typography.Text>
      ) : null}
      {props.children}
    </Card>
  );
};

export default WidgetContainer;
