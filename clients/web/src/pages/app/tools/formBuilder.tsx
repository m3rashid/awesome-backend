import { DndContext } from '@dnd-kit/core';
import React from 'react';

import useDesigner from '../../../components/formBuilder/useFormDesigner';

// import PageContainer from '../../../components/pageContainer';

const FormDesigner: React.FC = () => {
  const { elements, sensors } = useDesigner();

  return (
    <>
      <DndContext sensors={sensors}>
        {/* <PageContainer header={{ title: 'Form Designer' }}> */}
        <div>FormDesigner</div>
        {/* </PageContainer> */}
        <DragOverlayWrapper />
      </DndContext>
    </>
  );
};

export default FormDesigner;
