import { Button, Divider, Form, Typography } from 'antd';
import _ from 'lodash-es';
import React, { useEffect } from 'react';

import { FormElementInstance } from './builder/constants';
import elements from './elements';
import elementProps, { FORM_ITEM_PROPS_FIELD_NAME } from './exposedProps';
import RenderProps from './getProps';
import useFormbuilder from './useFormbuilder';

const RightHelperSidebar: React.FC = () => {
  const { selectedElement, updateElement, onSaveRootFormProps, addElement } =
    useFormbuilder();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (!selectedElement) return;
    form.setFields(
      Object.entries(selectedElement?.widgetProps || {}).map(
        ([key, value]) => ({ name: key, value })
      )
    );
  }, [selectedElement, form]);

  const onSaveHandler = () => {
    if (!selectedElement) return;

    const formValues = form.getFieldsValue();
    const transformedObject = Object.entries(formValues || {}).reduce<
      Record<string, string | number>
    >((acc, [key, value]) => {
      if (!key || !value) return acc;

      const [topLevelKey, innerKey] = key.split('.');
      if (!innerKey) return { ...acc, [key]: value };
      return {
        ...acc,
        [topLevelKey]: {
          ...(acc[topLevelKey] || ({} as any)),
          [innerKey]: value,
        },
      };
    }, {});

    const updatedElement: FormElementInstance = {
      ...selectedElement,
      ...transformedObject,
    };

    updateElement(updatedElement);
  };

  const onResetProps = () => {
    form.resetFields();
    if (!selectedElement) return;
    updateElement({ ...selectedElement, widgetProps: undefined });
  };

  const onResetFormProps = () => {
    form.resetFields();
  };

  const onSaveFormPropsHandler = () => {
    if (selectedElement) return null;
    const formValues = form.getFieldsValue();
    const transformedObject = Object.entries(formValues || {}).reduce(
      (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
      {}
    );
    onSaveRootFormProps(transformedObject);
  };

  return (
    <div className='p-2 w-80 flex flex-col gap-1 max-h-[calc(100vh-40px)] overflow-auto bg-white hide-scrollbar'>
      {selectedElement ? (
        <Form form={form} layout='vertical' onFinish={onSaveHandler}>
          <div>
            {Object.entries(elementProps[selectedElement.widgetName]).map(
              ([key, value]) => {
                if (key === FORM_ITEM_PROPS_FIELD_NAME) {
                  return (
                    <div key={key}>
                      <Typography.Title type='secondary' level={4}>
                        Form Props
                      </Typography.Title>
                      {Object.entries(value).map(([innerKey, innerValue]) => {
                        return (
                          <RenderProps
                            {...{
                              name: `${key}.${innerKey}`,
                              key: `${key}.${innerKey}`,
                              label: innerKey,
                              value: innerValue as any,
                            }}
                          />
                        );
                      })}

                      <Divider className='mt-8' />
                    </div>
                  );
                }

                return (
                  <RenderProps {...{ value, key, name: key, label: key }} />
                );
              }
            )}
          </div>

          <div className='flex items-center flex-shrink gap-2'>
            <Button onClick={onResetProps} className='flex-grow'>
              Reset
            </Button>
            <Button type='primary' htmlType='submit' className='flex-grow'>
              Save
            </Button>
          </div>
        </Form>
      ) : (
        // <Form form={form} layout='vertical' onFinish={onSaveFormPropsHandler}>
        //   <div>
        //     {Object.entries(elementProps.form).map(([key, value]) => (
        //       <RenderProps {...{ key, value, name: key, label: key }} />
        //     ))}
        //   </div>

        //   <div className='flex items-center flex-shrink gap-2'>
        //     <Button onClick={onResetFormProps} className='flex-grow'>
        //       Reset
        //     </Button>
        //     <Button type='primary' htmlType='submit' className='flex-grow'>
        //       Save
        //     </Button>
        //   </div>
        // </Form>
        <>
          <Typography.Title
            level={5}
            type='secondary'
            className='w-full text-center'
          >
            Form Elements
          </Typography.Title>

          <div className='grid grid-cols-2 gap-2'>
            {elements.map((element) => (
              <div
                key={element.widgetName}
                onClick={() => addElement(element)}
                className='p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-start gap-1'
              >
                <element.Icon className='text-xl' />
                <Typography.Text>
                  {_.startCase(element.widgetName.replace('-', ' '))}
                </Typography.Text>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RightHelperSidebar;
