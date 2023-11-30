import { Button, Card, Form, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import renderer from '../../../components/formBuilder';
import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const Forms: React.FC = () => {
  const getService = service('/api/forms/all');
  const [forms, setForms] = useState<any[]>([]);

  useEffect(() => {
    getService({
      method: 'POST',
      data: {
        searchCriteria: {},
        paginationOptions: { limit: 10, page: 1 },
      },
    })
      .then((res) => {
        setForms(
          res.data.docs.map((t: any) => ({
            ...t,
            jsonSchema: JSON.parse(t.jsonSchema),
          }))
        );
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer header={{ title: 'Forms' }}>
      <div className='flex gap-2 flex-wrap'>
        {forms.map((form) => (
          <Card
            key={form.id}
            style={{ maxWidth: 320, minWidth: 320 }}
            title={form.title}
            extra={<Button>Details</Button>}
          >
            {form.description ? (
              <div className='mb-4'>
                <Typography.Text>{form.description}</Typography.Text>
              </div>
            ) : null}
            <Form layout='vertical'>{renderer(form.jsonSchema)}</Form>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default Forms;
