import { SupportedWidget } from './builder/constants';

export const FORM_ITEM_PROPS_FIELD_NAME = 'formItemProps' as const;

export type SupportedValues =
  | 'string'
  | 'textarea'
  | 'number'
  | 'boolean'
  | Array<string>;
export type _Props = Record<string, SupportedValues>;
export type Props = Record<typeof FORM_ITEM_PROPS_FIELD_NAME, _Props> | _Props;

const formItemProps: Record<string, SupportedValues> = {
  name: 'string',
  label: 'string',
  style: 'textarea',
};

const formProps: Record<string, SupportedValues> = {
  layout: ['horizontal', 'inline', 'vertical'],
  colon: 'boolean',
  autoCorrect: 'boolean',
};

const textInputProps: Props = {
  formItemProps,
  bordered: 'boolean',
  defaultValue: 'string',
  disabled: 'boolean',
  maxLength: 'number',
  showCount: 'boolean',
  size: ['large', 'middle', 'small'],
};

const passwordInputProps: Props = {
  ...textInputProps,
  formItemProps,
  visibilityToggle: 'boolean',
};

const numberInputProps: Props = {
  formItemProps,
  bordered: 'boolean',
  controls: 'boolean',
  defaultValue: 'number',
  disabled: 'boolean',
  max: 'number',
  min: 'number',
  readOnly: 'boolean',
  status: ['error', 'warning'],
  size: ['large', 'middle', 'small'],
  step: 'number',
};

const buttonProps: Props = {
  formItemProps,
  children: 'string',
  block: 'boolean',
  danger: 'boolean',
  disabled: 'boolean',
  ghost: 'boolean',
  style: 'textarea',
  icon: 'string',
  shape: ['default', 'circle', 'round'],
  size: ['large', 'middle', 'small'],
  type: ['primary', 'dashed', 'link', 'text', 'default'],
  onClick: 'textarea',
};

const textAreaProps: Props = {
  formItemProps,
  allowClear: 'boolean',
  bordered: 'boolean',
  defaultValue: 'string',
  maxLength: 'number',
  showCount: 'boolean',
  onResize: 'textarea',
  onPressEnter: 'textarea',
};

const checkboxProps = {
  formItemProps,
};

const checkboxGroupProps = {
  formItemProps,
};

const radioProps = {
  formItemProps,
};

const radioGroupProps = {
  formItemProps,
};

const monthPickerProps = {
  formItemProps,
};

const quarterPickerProps = {
  formItemProps,
};

const timerangePickerProps = {
  formItemProps,
};

const timePickerProps = {
  formItemProps,
};

const weekPickerProps = {
  formItemProps,
};

const yearPickerProps = {
  formItemProps,
};

const switchProps = {
  formItemProps,
};

const selectProps = {
  formItemProps,
};

const imageProps = {};

const rowProps = {};

const colProps = {};

const elementProps: Record<SupportedWidget, Props> = {
  'text-input': textInputProps,
  'password-input': passwordInputProps,
  'number-input': numberInputProps,
  button: buttonProps,
  textarea: textAreaProps,
  checkbox: checkboxProps,
  'checkbox-group': checkboxGroupProps,
  radio: radioProps,
  'radio-group': radioGroupProps,
  'month-picker': monthPickerProps,
  'quarter-picker': quarterPickerProps,
  'timerange-picker': timerangePickerProps,
  'time-picker': timePickerProps,
  'week-picker': weekPickerProps,
  'year-picker': yearPickerProps,
  switch: switchProps,
  select: selectProps,
  image: imageProps,
  row: rowProps,
  col: colProps,
  'form-item': formItemProps,
  form: formProps,
};

export default elementProps;
