import { Button, Form, Radio } from 'antd';
import React from 'react';

import FormBuilder from '../../../components/forms/builder';
import ElementWrapper from '../../../components/forms/elementWrapper';
import FormJsonEditor from '../../../components/forms/jsonEditor';
import RightHelperSidebar from '../../../components/forms/rightSidebar';
import useFormbuilder from '../../../components/forms/useFormbuilder';
import PageContainer from '../../../components/pageContainer';

const FormBuilderPage: React.FC = () => {
  const {
    elements,
    setMode,
    mode,
    selectedElement,
    showFormParentProps,
    setElements,
  } = useFormbuilder();

  return (
    <PageContainer>
      <div className='flex h-screen'>
        <div className='w-full overflow-auto'>
          <div className='bg-white h-[40px] p-2 flex items-center justify-between'>
            <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
              <Radio.Button value='edit'>Visual Editor</Radio.Button>
              <Radio.Button value='json'>JSON Editor</Radio.Button>
              <Radio.Button value='preview'>Preview</Radio.Button>
            </Radio.Group>

            <Button disabled={!selectedElement} onClick={showFormParentProps}>
              Modify Form Container
            </Button>
          </div>

          <div className='h-[calc(100vh-88px)] m-2 mb-0 bg-[url(/paper.svg)] '>
            {mode === 'json' ? (
              <FormJsonEditor
                onChange={setElements}
                initialValue={{ meta: elements }}
              />
            ) : elements.length > 0 ? (
              mode === 'preview' ? (
                <div className='bg-white max-w-xl mx-auto rounded-sm'>
                  <Form layout='vertical' style={{ padding: 8 }}>
                    <FormBuilder meta={elements} />
                  </Form>
                </div>
              ) : (
                <div className='bg-white max-w-xl mx-auto rounded-sm'>
                  <Form layout='vertical' style={{ padding: 8 }}>
                    <FormBuilder
                      meta={elements.map((el) => ({
                        ...el,
                        render: (WidgetField: any) => (props: any) => {
                          return (
                            <ElementWrapper id={el.key} key={el.key}>
                              <WidgetField {...props} />
                            </ElementWrapper>
                          );
                        },
                      }))}
                    />
                  </Form>
                </div>
              )
            ) : null}
          </div>
        </div>

        {mode !== 'json' ? <RightHelperSidebar /> : null}
      </div>
    </PageContainer>
  );
};

export default FormBuilderPage;
