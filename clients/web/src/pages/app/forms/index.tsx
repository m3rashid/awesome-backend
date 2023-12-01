import { AreaChartOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Card, Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import renderer from '../../../components/formBuilder';
import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const Forms: React.FC = () => {
  const navigate = useNavigate();
  const getService = service('/api/forms/all');
  const [forms, setForms] = useState<any[]>([]);
  const [formInModal, setFormInModal] = useState<any | null>(null);

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
      <Modal
        width={320}
        footer={null}
        open={formInModal}
        title={formInModal?.title}
        onCancel={() => setFormInModal(null)}
      >
        <Card style={{ border: 0 }} bodyStyle={{ padding: 0 }}>
          {formInModal?.description ? (
            <Card.Meta
              style={{ marginTop: -8, marginBottom: 16 }}
              description={formInModal?.description}
            />
          ) : null}

          <Form disabled layout='vertical'>
            {renderer(formInModal?.jsonSchema)}
          </Form>
        </Card>
      </Modal>

      <div className='flex gap-2 flex-wrap'>
        {forms.map((form) => (
          <Card
            key={form.id}
            title={form.title}
            style={{ maxWidth: 320, minWidth: 320 }}
          >
            {form.description ? (
              <Card.Meta
                style={{ marginTop: -8, marginBottom: 16 }}
                description={form.description}
              />
            ) : null}

            <div className='flex justify-between gap-2'>
              <Button
                type='link'
                icon={<FormOutlined />}
                onClick={() => setFormInModal(form)}
              >
                Show Form
              </Button>
              <Button
                type='link'
                icon={<AreaChartOutlined />}
                onClick={() => navigate(`/app/forms/${form.id}/responses`)}
              >
                Responses
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default Forms;
