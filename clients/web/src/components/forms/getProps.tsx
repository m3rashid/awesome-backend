import { Checkbox, Form, Input, InputNumber, Select } from 'antd';
import _ from 'lodash-es';
import { CSSProperties } from 'react';

import { SupportedValues } from './exposedProps';

const RenderProps = (props: {
  name: string;
  label?: string;
  value: SupportedValues;
}) => {
  const labelToShow = _.startCase(props.label);
  const commonStyles: CSSProperties = {
    marginBottom: 10,
  };

  if (Array.isArray(props.value)) {
    return (
      <Form.Item label={labelToShow} name={props.name} style={commonStyles}>
        <Select
          {...{
            options: props.value.map((t) => ({ label: t, value: t })),
            ...(props.label
              ? { placeholder: `Select value for ${props.label}` }
              : {}),
          }}
        />
      </Form.Item>
    );
  }

  if (props.value === 'string') {
    return (
      <Form.Item name={props.name} label={labelToShow} style={commonStyles}>
        <Input
          {...(props.label ? { placeholder: `Value for ${props.label}` } : {})}
        />
      </Form.Item>
    );
  }

  if (props.value === 'boolean') {
    return (
      <Form.Item name={props.name} valuePropName='checked' style={commonStyles}>
        <Checkbox>{labelToShow}</Checkbox>
      </Form.Item>
    );
  }

  if (props.value === 'number') {
    return (
      <Form.Item name={props.name} label={labelToShow} style={commonStyles}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
    );
  }

  if (props.value === 'textarea') {
    return (
      <Form.Item name={props.name} label={labelToShow} style={commonStyles}>
        <Input.TextArea
          {...(props.label ? { placeholder: `Value for ${props.label}` } : {})}
        />
      </Form.Item>
    );
  }
};

export default RenderProps;
