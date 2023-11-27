import Editor from '@monaco-editor/react';
import { Button, notification } from 'antd';
import { FC, useState } from 'react';

import { FormBuilderMeta } from './builder/constants';

type FormJsonEditorProps = {
  initialValue: {
    meta: FormBuilderMeta;
    formProps: Record<string, string | number>;
  };
  onChange: (
    meta: FormBuilderMeta,
    formProps: Record<string, string | number>
  ) => void;
};

const FormJsonEditor: FC<FormJsonEditorProps> = ({
  onChange,
  initialValue,
}) => {
  const [value, setValue] = useState<any>(
    JSON.stringify(initialValue, null, 2)
  );

  const handleSave = () => {
    try {
      const { meta, formProps } = JSON.parse(value);
      onChange(meta, formProps);
      notification.success({ message: 'Form saved' });
    } catch (err) {
      notification.error({ message: 'Invalid JSON' });
    }
  };

  return (
    <div className='flex flex-col items-end justify-center gap-2'>
      <Button type='primary' onClick={handleSave}>
        Save Form
      </Button>
      <Editor
        height={600}
        value={value}
        language='json'
        onChange={setValue}
        theme='vs-light'
      />
    </div>
  );
};

export default FormJsonEditor;
