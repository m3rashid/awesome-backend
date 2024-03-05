import {
  DndContext,
  MouseSensor,
  TouchSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import React from 'react';
import KanbanLane from './kanbanLane';
import useLeads from './useLeads';

import { LeadStatus, Lead } from '@awesome/shared/types/crm';

export type BoardProps = {};

export type BoardItems = Record<LeadStatus, Lead[]>;

const Board: React.FC<BoardProps> = () => {
  const { items, setItems } = useLeads();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const desinationLane = e.over?.id;
        if (!e.active.data.current) {
          console.log('no data');
          return;
        }
        if (!desinationLane) {
          console.log('no destination');
          return;
        }

        if (e.active.data.current.parent === desinationLane) {
          console.log('same lane');
          return;
        }

        setItems((prev) => {
          const newItems = { ...prev };
          newItems[desinationLane as LeadStatus] = [
            ...newItems[desinationLane as LeadStatus],
            e.active.data.current?.lead,
          ];

          newItems[e.active.data.current?.parent as LeadStatus] = newItems[
            e.active.data.current?.parent as LeadStatus
          ].filter((item) => item.id !== e.active.data.current?.lead.id);
          return newItems;
        });
      }}
      // onDragEnd={(e) => {
      //   const container = e.over?.id;
      //   const title = e.active.data.current?.title ?? '';
      //   const index = e.active.data.current?.index ?? 0;
      //   const parent = e.active.data.current?.parent ?? 'ToDo';
      //   if (container === 'ToDo') {
      //     setTodoItems([...todoItems, { title }]);
      //   } else if (container === 'Done') {
      //     setDoneItems([...doneItems, { title }]);
      //   } else if (container === 'Unassigned') {
      //     setuItems([...uItems, { title }]);
      //   } else {
      //     setInProgressItems([...inProgressItems, { title }]);
      //   }
      //   if (parent === 'ToDo') {
      //     setTodoItems([
      //       ...todoItems.slice(0, index),
      //       ...todoItems.slice(index + 1),
      //     ]);
      //   } else if (parent === 'Done') {
      //     setDoneItems([
      //       ...doneItems.slice(0, index),
      //       ...doneItems.slice(index + 1),
      //     ]);
      //   } else if (parent === 'Unassigned') {
      //     setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
      //   } else {
      //     setInProgressItems([
      //       ...inProgressItems.slice(0, index),
      //       ...inProgressItems.slice(index + 1),
      //     ]);
      //   }
      // }}
    >
      <div className='flex gap-2 overflow-x-auto mt-4 h-[calc(100vh-158px)] hide-scrollbar'>
        {Object.keys(items).map((key) => (
          <KanbanLane key={key} laneIdentifier={key as LeadStatus} />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
