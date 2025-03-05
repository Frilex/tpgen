import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaTimes } from 'react-icons/fa';

function SortableBlockInstance({ block }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.instanceId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: block.color || "#ffffff",
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className="block-instance"
    >
      <div className="block-header">
        <strong>{block.label}</strong>
        <button className="btn-delete">
          <FaTimes />
        </button>
      </div>
      <div className="block-content">
        {/* Hier können weitere Optionen bzw. Inhalte für den Block ergänzt werden */}
      </div>
    </div>
  );
}

export default SortableBlockInstance;