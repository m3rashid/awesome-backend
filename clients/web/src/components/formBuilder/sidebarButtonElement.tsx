import { useDraggable } from '@dnd-kit/core';
import { Card } from '@fluentui/react-components';
import React from 'react';

import { FormElement } from './elements';

export type SidebarButtonElementProps = {
  formElement: FormElement;
};

const SidebarButtonElement: React.FC<SidebarButtonElementProps> = ({
  formElement,
}) => {
  const draggable = useDraggable({
    id: `sidebar-button-element-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Card
      ref={draggable.setNodeRef}
      className={`h-[120px] w-[120px] cursor-grab ${
        draggable.isDragging ? 'ring-2 ring-black' : ''
      }`}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <formElement.designerButtonElement.icon />
      {formElement.designerButtonElement.label}
    </Card>
  );
};

export const SidebarButtonElementOverlay: React.FC<
  SidebarButtonElementProps
> = ({ formElement }) => {
  return (
    <Card className='h-[120px] w-[120px] cursor-grab'>
      <formElement.designerButtonElement.icon />
      {formElement.designerButtonElement.label}
    </Card>
  );
};

export default SidebarButtonElement;
