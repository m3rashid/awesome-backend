import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { Button, Card, Subtitle2Stronger } from '@fluentui/react-components';
import { Delete20Regular } from '@fluentui/react-icons';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import { ElementType, FormElementInstance, formElements } from './elements';
import useDesigner from './useDesigner';

const FormBuilder: React.FC = () => {
  const {
    elements,
    addElement,
    // selectedElement,
    // setSelectedElement,
    removeElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: { isDesignerDropArea: true },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement =
        active.data?.current?.isDesignerButtonElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerButtonElement && isDroppingOverDesignerDropArea;

      // First scenario
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = formElements[type as ElementType].construct(
          nanoid()
        );

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerButtonElement && isDroppingOverDesignerElement;

      // Second scenario
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = formElements[type as ElementType].construct(
          nanoid()
        );

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error('element not found');
        }

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      // Third scenario
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('element not found');
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <Card
      ref={droppable.setNodeRef}
      className={`w-[720px] flex items-center justify-center max-w-full ${
        droppable.isOver ? 'ring-2 ring-black' : ''
      }`}
    >
      {!droppable.isOver && elements.length === 0 ? (
        <Subtitle2Stronger>Drop Here</Subtitle2Stronger>
      ) : null}

      {droppable.isOver && elements.length === 0 ? (
        <Card className='w-full p-4 h-[120px]'></Card>
      ) : null}

      {elements.length > 0 && (
        <div className='flex flex-col  w-full gap-2 p-4'>
          {elements.map((element) => (
            <DesignerElementWrapper key={element.id} element={element} />
          ))}
        </div>
      )}
    </Card>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const {
    removeElement,
    // selectedElement,
    setSelectedElement,
  } = useDesigner();

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null; // temporary remove the element from designer

  const DesignerElement = formElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute w-full h-1/2 rounded-t-md'
      />

      <div
        ref={bottomHalf.setNodeRef}
        className='absolute w-full bottom-0 h-1/2 rounded-b-md'
      />

      {mouseIsOver ? (
        <>
          <div className='absolute right-0 h-full'>
            <Button
              className='h-full'
              icon={<Delete20Regular />}
              onClick={(e) => {
                e.stopPropagation(); // avoid selection of element while deleting
                removeElement(element.id);
              }}
            ></Button>
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
            <p className='text-muted-foreground text-sm'>
              Click for properties or drag to move
            </p>
          </div>
        </>
      ) : null}

      {topHalf.isOver ? (
        <div className='absolute top-0 w-full rounded-md h-[7px] bg-blue-300 rounded-b-none' />
      ) : null}

      <div
        className={`flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100 ${
          mouseIsOver ? 'opacity-30' : ''
        }`}
      >
        <DesignerElement elementInstance={element} />
      </div>

      {bottomHalf.isOver ? (
        <div className='absolute bottom-0 w-full rounded-md h-[7px] bg-blue-300 rounded-t-none' />
      ) : null}
    </div>
  );
}

export default FormBuilder;
