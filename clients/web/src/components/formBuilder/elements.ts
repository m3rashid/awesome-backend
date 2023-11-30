import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
} from 'antd';
import { Key } from 'react';

export const formBuilderElements = {
  input: Input,
  password: Input.Password,
  number: InputNumber,
  button: Button,
  textarea: Input.TextArea,
  checkbox: Checkbox,
  checkboxGroup: Checkbox.Group,
  radio: Radio,
  radioGroup: Radio.Group,
  monthPicker: DatePicker.MonthPicker,
  quarterPicker: DatePicker.QuarterPicker,
  timePicker: DatePicker.TimePicker,
  timeRangePicker: DatePicker.RangePicker,
  weekPicker: DatePicker.WeekPicker,
  yearPicker: DatePicker.YearPicker,
  switch: Switch,
  select: Select,
  image: Image,
  row: Row,
  col: Col,
  formItem: Form.Item,
  date: DatePicker,
} as const;

export type FormBuilderElements = typeof formBuilderElements;
export type FormBuilderElement = keyof FormBuilderElements;

export type FormItemProps = {
  label: string;
  name: string;
  rules?: any[];
} & Record<string, any>;

export type ComponentConfig = {
  type: FormBuilderElement;
  key?: Key;
  props?: Record<string, any>;
  formItemProps?: FormItemProps;
  children?: ComponentConfig[] | string;
};
