import React from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Lead, leadStatus } from '@awesome/shared/types/crm';

import KanbanLane from './kanbanLane';

export type BoardProps = {
  items: BoardItems;
  setItems: React.Dispatch<React.SetStateAction<BoardItems>>;
};

export type BoardItems = Record<(typeof leadStatus)[number], Lead[]>;

const Board: React.FC<BoardProps> = ({ items, setItems }) => {
  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        // console.log({ current: e.active.data.current, over: e.over });
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
          newItems[desinationLane] = [
            ...newItems[desinationLane],
            e.active.data.current.lead,
          ];

          newItems[e.active.data.current.parent] = newItems[
            e.active.data.current.parent
          ].filter((item) => item.id !== e.active.data.current.lead.id);
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
      <div className='flex gap-2 flex-col'>
        <div className='flex gap-2'>
          <KanbanLane items={items.todo} laneIdentifier='todo' />
          <KanbanLane items={items.in_progress} laneIdentifier='in_progress' />
          <KanbanLane items={items.done} laneIdentifier='done' />
        </div>
      </div>
    </DndContext>
  );
};

export default Board;
