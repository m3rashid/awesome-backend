import React from 'react';

import LeadCard from './leadCard';
import { useDroppable } from '@dnd-kit/core';
import { Lead, leadStatus } from '@awesome/shared/types/crm';
import { Card } from '@fluentui/react-components';

export type KanbanLaneProps = {
  laneIdentifier: (typeof leadStatus)[number];
  items: Lead[];
};

const KanbanLane: React.FC<KanbanLaneProps> = ({ items, laneIdentifier }) => {
  const { setNodeRef } = useDroppable({ id: laneIdentifier });

  return (
    <Card className='flex flex-col gap-2 min-h-[600px] min-w-[300px]'>
      <h3>{laneIdentifier}</h3>

      <div className='flex flex-col gap-2 h-full' ref={setNodeRef}>
        {items.map((lead, index) => (
          <LeadCard
            lead={lead}
            key={lead.id}
            index={index}
            parent={laneIdentifier}
          />
        ))}
      </div>
    </Card>
  );
};

export default KanbanLane;
