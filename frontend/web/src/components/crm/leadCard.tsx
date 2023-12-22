import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';
import { Card } from '@fluentui/react-components';
import { Lead } from '@awesome/shared/types/crm';

export type LeadCardProps = {
  lead: Lead;
  index: number;
  parent: string;
};

const LeadCard: React.FC<LeadCardProps> = ({ index, parent, lead }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: lead.id,
      data: { lead, index, parent },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    backgroundColor: isDragging ? 'lightgray' : 'white',
    ...(isDragging ? { zIndex: 1000 } : {}),
  };

  return (
    <Card {...listeners} {...attributes} style={style} ref={setNodeRef}>
      <div>{lead.name}</div>
      <div>{lead.email}</div>
    </Card>
  );
};

export default LeadCard;
