import { Card, Statistic, Table, TableColumnType } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../../components/atoms/loader';
import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const FormResponses: React.FC = () => {
  const params = useParams();
  const [formResponses, setFormResponses] = useState<any | null>({});
  const [parentForm, setParentForm] = useState<any | null>(null);

  const getFormService = service('/api/forms/get');
  const getResponsesService = service('/api/forms/responses');

  const getForm = async (id: string) => {
    const res = await getFormService({
      method: 'POST',
      data: { id: Number(id) },
    });
    setParentForm({ ...res.data, jsonSchema: JSON.parse(res.data.jsonSchema) });
  };

  const getFormResponses = async (id: string) => {
    const res = await getResponsesService({
      method: 'POST',
      data: {
        searchCriteria: { formId: Number(id) },
        paginationOptions: { limit: 10, page: 1 },
      },
    });
    setFormResponses({
      ...res.data,
      docs: res.data.docs.map((formRes: any) => ({
        ...formRes,
        responseData: JSON.parse(formRes.responseData),
      })),
    });
  };

  useEffect(() => {
    if (!params.formId) return;
    Promise.allSettled([
      getForm(params.formId),
      getFormResponses(params.formId),
    ]).catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.formId]);

  const tableColumns = useMemo(() => {
    if (!parentForm) return [];
    const columns: TableColumnType<any>[] = [
      { title: 'Sl.No.', dataIndex: 'id' },
    ];

    for (let i = 0; i < parentForm.jsonSchema.length; i++) {
      if (!parentForm.jsonSchema[i].formItemProps?.name) continue;
      columns.push({
        title: parentForm.jsonSchema[i].formItemProps.label,
        dataIndex: parentForm.jsonSchema[i].formItemProps.name,
        key: parentForm.jsonSchema[i].formItemProps.name,
      });
    }

    return columns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentForm]);

  if (!parentForm || !formResponses) return <Loader />;

  return (
    <PageContainer
      header={{ title: `Responses for "${parentForm.title}" form` }}
    >
      <div className='flex mb-2'>
        <Card>
          <Statistic title='Total Responses' value={formResponses.totalDocs} />
        </Card>
      </div>

      <Table
        columns={tableColumns}
        dataSource={(formResponses.docs || []).map((t: any) => ({
          id: t.id,
          ...t.responseData,
        }))}
      />
    </PageContainer>
  );
};

export default FormResponses;
