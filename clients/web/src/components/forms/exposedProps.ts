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
};

const textInputProps: Props = {
  formItemProps,
};

const passwordInputProps: Props = {
  ...textInputProps,
  formItemProps,
};

const numberInputProps: Props = {
  formItemProps,
  max: 'number',
  min: 'number',
  step: 'number',
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

const elementProps: Record<SupportedWidget, Props> = {
  'text-input': textInputProps,
  'password-input': passwordInputProps,
  'number-input': numberInputProps,
  // button: buttonProps,
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
  // row: rowProps,
  // col: colProps,
  // 'form-item': formItemProps,
  // form: formProps,
};

export default elementProps;
