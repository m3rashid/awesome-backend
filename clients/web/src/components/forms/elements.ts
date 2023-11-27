import { CloseOutlined } from '@ant-design/icons';

import { SupportedWidget } from './builder/constants';

export type Element = {
  Icon: typeof CloseOutlined;
  widgetName: SupportedWidget;
};

const elements: Array<Element> = [
  { widgetName: 'text-input', Icon: CloseOutlined },
  { widgetName: 'password-input', Icon: CloseOutlined },
  { widgetName: 'number-input', Icon: CloseOutlined },
  { widgetName: 'button', Icon: CloseOutlined },
  { widgetName: 'textarea', Icon: CloseOutlined },
  { widgetName: 'checkbox', Icon: CloseOutlined },
  { widgetName: 'checkbox-group', Icon: CloseOutlined },
  { widgetName: 'radio', Icon: CloseOutlined },
  { widgetName: 'radio-group', Icon: CloseOutlined },
  { widgetName: 'month-picker', Icon: CloseOutlined },
  { widgetName: 'quarter-picker', Icon: CloseOutlined },
  { widgetName: 'timerange-picker', Icon: CloseOutlined },
  { widgetName: 'time-picker', Icon: CloseOutlined },
  { widgetName: 'week-picker', Icon: CloseOutlined },
  { widgetName: 'year-picker', Icon: CloseOutlined },
  { widgetName: 'switch', Icon: CloseOutlined },
  { widgetName: 'select', Icon: CloseOutlined },
  { widgetName: 'image', Icon: CloseOutlined },
  { widgetName: 'row', Icon: CloseOutlined },
  { widgetName: 'col', Icon: CloseOutlined },
  { widgetName: 'form-item', Icon: CloseOutlined },
  { widgetName: 'form', Icon: CloseOutlined },
];

export default elements;
