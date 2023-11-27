import { Form } from 'antd';
import React from 'react';

import { FormRenderProps, widgetMap } from './constants';

const FormRenderer: React.FC<FormRenderProps> = ({ meta }) => {
  return (
    <>
      {meta.map(
        ({
          key,
          children,
          widgetName,
          widgetProps,
          render = undefined,
          formItemProps = {},
          renderChildren = undefined,
        }) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const Widget = widgetMap[widgetName];
          let WidgetField = Widget.fieldTransformer
            ? Widget.fieldTransformer(Widget)
            : Widget?.widget;

          if (render) {
            WidgetField = render(WidgetField);
          }

          if (children && children.length > 0) {
            return (
              <WidgetField key={key} {...widgetProps}>
                <FormRenderer meta={children} />
              </WidgetField>
            );
          } else if (formItemProps) {
            return (
              <Form.Item key={key} {...formItemProps}>
                <WidgetField {...widgetProps} />
              </Form.Item>
            );
          } else {
            return (
              <WidgetField key={key} {...widgetProps}>
                {renderChildren ? renderChildren : undefined}
              </WidgetField>
            );
          }
        }
      )}
    </>
  );
};

export default FormRenderer;
