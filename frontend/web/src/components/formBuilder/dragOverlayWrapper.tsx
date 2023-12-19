import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';

import { ElementType, formElements } from './elements';
import { SidebarButtonElementOverlay } from './sidebarButtonElement';
import useDesigner from './useDesigner';

export type DragOverlayWrapperProps = {
  //
};

const DragOverlayWrapper: React.FC<DragOverlayWrapperProps> = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;
  let node = <div>No drag overlay</div>;
  const isSidebarBtnElement =
    draggedItem.data?.current?.isDesignerButtonElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementType;
    node = <SidebarButtonElementOverlay formElement={formElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent =
        formElements[element.type].designerComponent;

      node = (
        <div className='flex bg-gray-200 border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none'>
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
