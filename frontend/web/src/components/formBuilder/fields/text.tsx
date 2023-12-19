import { TextT20Regular } from '@fluentui/react-icons';
import { z } from 'zod';

import { ElementType, FormElement, FormElementInstance } from '../elements';

const type: ElementType = 'textField';

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
});
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

const extra: propertiesFormSchemaType = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeHolder: 'Value here...',
};

type CustomInstance = FormElementInstance & {
  extra: propertiesFormSchemaType;
};

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: CustomInstance;
}) => {
  return <div>{JSON.stringify(elementInstance, null, 2)}</div>;
};

export const TextFieldFormElement: FormElement = {
  type: 'textField',
  designerComponent: DesignerComponent as any,
  formComponent: () => <div>TextField</div>,
  propertiesComponent: () => <div>TextField</div>,
  construct: (id: string) => ({ id, type, extra: extra }),
  designerButtonElement: { icon: TextT20Regular, label: 'Text Field' },

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extra.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};
