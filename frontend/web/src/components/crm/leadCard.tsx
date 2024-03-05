import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';
import { Card } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';

export type LeadCardProps = {
  lead: Lead;
  index: number;
  parent: string;
};

const LeadCard: React.FC<LeadCardProps> = ({ index, parent, lead }) => {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: lead.id,
      data: { lead, index, parent },
    });

  const style = {
    zIndex: 1000,
    transform: CSS.Translate.toString(transform),
    backgroundColor: isDragging ? 'lightgray' : 'white',
  };

  return (
    <Card
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      onClick={() => navigate(`/app/crm/leads/${lead.id}`)}
    >
      <div>{lead.name}</div>
      <div>{lead.email}</div>
    </Card>
  );
};

export default LeadCard;
