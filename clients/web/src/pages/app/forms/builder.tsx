import { useAuthValue } from '@awesome/shared/atoms/auth';
import Editor from '@monaco-editor/react';
import { Button, Card, Form, Input, message, Tabs } from 'antd';
import React, { useState } from 'react';

import renderer from '../../../components/formBuilder';
import { ComponentConfig } from '../../../components/formBuilder/elements';
import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const FormBuilderPage: React.FC = () => {
  const auth = useAuthValue();
  const [formValues, setFormValues] = useState({ title: '', description: '' });
  const [view, setView] = useState('builder');
  const [formJson, setFormJson] = useState<ComponentConfig[]>([]);

  const handleChange = (val: any) => {
    try {
      const jsonVal = JSON.parse('{"meta":' + val + '}');
      for (let i = 0; i < jsonVal.meta.length; i++) {
        if (!jsonVal.meta[i].type || jsonVal.meta[i].type === '') {
          message.error("Type can't be empty");
          return;
        }
      }

      setFormJson(jsonVal.meta);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSaveForm = async () => {
    const createService = service('/api/forms/create');
    await createService({
      method: 'POST',
      data: {
        authRequired: false,
        title: formValues.title,
        createdById: auth?.user.id,
        description: formValues.description,
        jsonSchema: JSON.stringify(formJson),
      },
    });
    setFormValues({ title: '', description: '' });
    setFormJson([]);
  };

  return (
    <PageContainer>
      <Card
        style={{ marginBottom: 8 }}
        bodyStyle={{
          gap: 8,
          padding: 4,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Tabs
          onChange={(key) => setView(key)}
          style={{ paddingLeft: 16, paddingTop: 0, paddingBottom: 0 }}
          className='bg-white rounded-md flex-grow'
          defaultActiveKey='1'
          items={[
            { key: 'builder', label: 'Form Builder' },
            { key: 'render', label: 'Form Display' },
          ]}
        />

        <Button type='primary' onClick={handleSaveForm}>
          Save Form
        </Button>
      </Card>

      <Card
        style={{ marginBottom: 8, paddingLeft: 8, paddingRight: 8 }}
        bodyStyle={{ padding: 4 }}
      >
        <Form layout='vertical' style={{ display: 'flex', gap: 8 }}>
          <Form.Item label='Title' style={{ flexGrow: 1 }}>
            <Input
              placeholder='Form Title'
              value={formValues.title}
              onChange={(e) => {
                setFormValues((p) => ({ ...p, title: e.target.value }));
              }}
            />
          </Form.Item>
          <Form.Item label='Description' style={{ flexGrow: 1 }}>
            <Input
              placeholder='Form Description'
              value={formValues.description}
              onChange={(e) => {
                setFormValues((p) => ({ ...p, description: e.target.value }));
              }}
            />
          </Form.Item>
        </Form>
      </Card>

      <Card
        bodyStyle={{ display: 'flex', justifyContent: 'center' }}
        style={{ minHeight: 632 }}
      >
        {view === 'builder' ? (
          <Editor
            height={600}
            language='json'
            defaultValue='[]'
            onChange={handleChange}
            value={JSON.stringify(formJson, null, 2)}
          />
        ) : (
          <Card className='min-w-[320px] max-w-[320px]'>
            <Form layout='vertical'>{renderer(formJson)}</Form>
          </Card>
        )}
      </Card>
    </PageContainer>
  );
};

export default FormBuilderPage;
