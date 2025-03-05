import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import BlockInstance from './BlockInstance';

function DropArea({ blocks, parentId, onDelete, onMove, onUpdateOptions, className = '' }) {
  const droppableId = parentId === null ? 'drop-area' : `drop-area-${parentId}`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });
  
  return (
    <div
      ref={setNodeRef}
      className={`drop-area ${className} ${isOver ? 'active' : ''}`}
    >
      {blocks.map((blockInstance) => (
        <BlockInstance
          key={blockInstance.instanceId}
          block={blockInstance}
          onDelete={onDelete}
          onMove={onMove}
          onUpdateOptions={onUpdateOptions}
        />
      ))}
    </div>
  );
}

export default DropArea;
