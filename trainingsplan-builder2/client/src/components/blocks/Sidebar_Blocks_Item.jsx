import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function Sidebar_Blocks_Item({ block }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: block.id,
    data: { block }
  });

  const blockColors = {
    aufwaermen: "#fde2e2",
    tempolauf: "#e2f0cb",
    dauerlauf: "#cde7f0",
    gehpause: "#fff3cd",
    trabpause: "#d6d8db",
    abkuehlung: "#d1e7dd",
    wiederholung: "#f8d7da"
  };

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        backgroundColor: blockColors[block.id] || "#ffffff"
      }
    : { backgroundColor: blockColors[block.id] || "#ffffff" };

  return (
    <div 
      ref={setNodeRef} 
      className="sidebar-item"
      style={style}
      {...listeners} 
      {...attributes}
    >
      {block.label}
    </div>
  );
}

export default Sidebar_Blocks_Item;
