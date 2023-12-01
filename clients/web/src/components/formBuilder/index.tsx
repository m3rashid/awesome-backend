import { Form } from 'antd';
import { createElement, ReactNode } from 'react';

import { ComponentConfig, formBuilderElements } from './elements';

const renderer = (config?: ComponentConfig[] | undefined) => {
  if (!config || config.length === 0 || typeof config === 'undefined') {
    return null;
  }

  return config.map((item): ReactNode => {
    if (
      !item.key &&
      !item.props?.key &&
      import.meta.env.MODE !== 'production'
    ) {
      console.warn(`Key is required in a form builder item: ${item.type}`);
    }

    const inner: ReactNode = createElement(
      formBuilderElements[item.type] as any,
      { ...(item.props || {}), ...{} },
      typeof item.children === 'string'
        ? item.children
        : renderer(item.children)
    );

    if (item.formItemProps && item.formItemProps.name) {
      return <Form.Item {...item.formItemProps}>{inner}</Form.Item>;
    }
    return inner;
  });
};

export default renderer;
