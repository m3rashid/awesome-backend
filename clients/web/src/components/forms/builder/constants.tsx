import {
  CheckboxProps,
  FormItemProps,
  ImageProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  SwitchProps,
  TimePickerProps,
} from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import {
  MonthPickerProps,
  RangePickerProps,
  WeekPickerProps,
} from 'antd/es/date-picker';
import { PasswordProps, TextAreaProps } from 'antd/es/input';
import React from 'react';
import { FC } from 'react';

export type WidgetNameWithProps =
  | { widgetName: 'text-input'; widgetProps?: InputProps }
  | { widgetName: 'password-input'; widgetProps?: PasswordProps }
  | { widgetName: 'number-input'; widgetProps?: InputNumberProps }
  // | { widgetName: 'button'; widgetProps?: ButtonProps }
  | { widgetName: 'textarea'; widgetProps?: TextAreaProps }
  | { widgetName: 'checkbox'; widgetProps?: CheckboxProps }
  | { widgetName: 'checkbox-group'; widgetProps?: CheckboxGroupProps }
  | { widgetName: 'radio'; widgetProps?: RadioProps }
  | { widgetName: 'radio-group'; widgetProps?: RadioGroupProps }
  | { widgetName: 'month-picker'; widgetProps?: MonthPickerProps }
  | { widgetName: 'quarter-picker'; widgetProps?: any }
  | { widgetName: 'timerange-picker'; widgetProps?: RangePickerProps }
  | { widgetName: 'time-picker'; widgetProps?: TimePickerProps }
  | { widgetName: 'week-picker'; widgetProps?: WeekPickerProps }
  | { widgetName: 'year-picker'; widgetProps?: any }
  | { widgetName: 'switch'; widgetProps?: SwitchProps }
  | { widgetName: 'select'; widgetProps?: SelectProps }
  | { widgetName: 'image'; widgetProps?: ImageProps };
// | { widgetName: 'row'; widgetProps?: RowProps }
// | { widgetName: 'col'; widgetProps?: ColProps }
// | { widgetName: 'form-item'; widgetProps?: FormItemProps }
// | { widgetName: 'form'; widgetProps?: FormProps<any> & { children?: any } };

export type SupportedWidget = WidgetNameWithProps['widgetName'];

export type WidgetProps<T extends SupportedWidget> = Extract<
  WidgetNameWithProps,
  { widgetName: T }
>['widgetProps'];

export type CurrentWidgetFCProps<T extends SupportedWidget> = React.FC<
  WidgetProps<T>
>;

export type FormElementInstance = WidgetNameWithProps & {
  key: string;
  children?: FormElementInstance[];
  renderChildren?: any;
  formItemProps?: FormItemProps;
  render?: (field: any) => React.FC;
};

export type FormBuilderMeta = FormElementInstance[];

export interface FormRenderProps {
  meta: FormBuilderMeta;
}

export const widgetMap: Record<
  SupportedWidget & Omit<string, SupportedWidget>,
  { widget: FC; fieldTransformer?: (field: any) => FC }
> = {};

export const widgetKeys = Object.keys(widgetMap);
