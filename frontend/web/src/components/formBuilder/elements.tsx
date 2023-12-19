import { FluentIcon } from '@fluentui/react-icons';
import React from 'react';

import { TextFieldFormElement } from './fields/text';

export type ElementType = 'textField';

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementType;
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  designerButtonElement: {
    icon: FluentIcon;
    label: string;
  };
  construct: (id: string) => FormElementInstance;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementType;
  extra?: Record<string, any>;
};

type FormElementsType = Record<ElementType, FormElement>;

export const formElements: FormElementsType = {
  textField: TextFieldFormElement,
};
