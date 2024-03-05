import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Body1Strong } from '@fluentui/react-components';

import LeadCard from './leadCard';
import useLeads from './useLeads';

export type KanbanLaneProps = {
  laneIdentifier: LeadStatus;
};

const KanbanLane: React.FC<KanbanLaneProps> = ({ laneIdentifier }) => {
  const { items: allLeads } = useLeads();
  const { setNodeRef } = useDroppable({ id: laneIdentifier });

  return (
    <div className='flex flex-col gap-2 min-w-[300px] rounded-md shadow-lg'>
      <div className='bg-blue-100 px-4 py-2 border-b-2 rounded-tl-md rounded-tr-md'>
        <Body1Strong>
          {laneIdentifier.toUpperCase().replace('_', ' ')}
        </Body1Strong>
      </div>

      <div className='flex flex-col gap-2 h-full p-2' ref={setNodeRef}>
        {allLeads[laneIdentifier].map((lead, index) => (
          <LeadCard
            lead={lead}
            key={lead.id}
            index={index}
            parent={laneIdentifier}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanLane;
