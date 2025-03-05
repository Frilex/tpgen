import React from 'react';
import SidebarItem from './Sidebar_Blocks_Item';

function Sidebar_Blocks({ availableBlocks }) {
  return (
    <div className='right-panel'>
      <h3 className="sidebar-title">Trainingsblöcke</h3>
      {availableBlocks.map(block => (
        <SidebarItem key={block.id} block={block} />
      ))}
    </div>
  );
}

export default Sidebar_Blocks;
