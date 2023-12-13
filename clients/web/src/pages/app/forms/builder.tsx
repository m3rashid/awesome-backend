import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import React from 'react';

import FormBuilder from '../../../components/formBuilder';
import DesignerContextProvider from '../../../components/formBuilder/designerContext';
import DragOverlayWrapper from '../../../components/formBuilder/dragOverlayWrapper';
import FormBuilderSidebar from '../../../components/formBuilder/sidebar';
import PageContainer from '../../../components/pageContainer';

const FormBuilderPage: React.FC = () => {
  // const { formId } = useParams();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    })
  );

  return (
    <PageContainer>
      <DesignerContextProvider>
        <DndContext sensors={sensors}>
          <div className='flex justify-center gap-4'>
            <FormBuilder />
            <FormBuilderSidebar />
          </div>
          <DragOverlayWrapper />
        </DndContext>
      </DesignerContextProvider>
    </PageContainer>
  );
};

export default FormBuilderPage;
