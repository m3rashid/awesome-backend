import { Button, Card, Subtitle2Stronger } from '@fluentui/react-components';
import { ClosedCaption20Regular } from '@fluentui/react-icons';
import React from 'react';

import { formElements } from './elements';
import SidebarButtonElement from './sidebarButtonElement';
import useDesigner from './useDesigner';

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm =
    formElements[selectedElement?.type].propertiesComponent;

  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-foreground/70'>Element properties</p>
        <Button
          appearance='subtle'
          icon={<ClosedCaption20Regular />}
          onClick={() => {
            setSelectedElement(null);
          }}
        ></Button>
      </div>
      {/* <Separator className='mb-4' /> */}
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

const FormBuilderSidebar: React.FC = () => {
  const { selectedElement } = useDesigner();

  return (
    <Card className='w-[320px] max-w-[320px] flex flex-col gap-2'>
      <Subtitle2Stronger>Elements</Subtitle2Stronger>
      {selectedElement ? (
        <PropertiesFormSidebar />
      ) : (
        <SidebarButtonElement formElement={formElements.textField} />
      )}
    </Card>
  );
};

export default FormBuilderSidebar;
