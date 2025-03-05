import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import Sidebar_Blocks from './components/blocks/Sidebar_Blocks';
import Sidebar_SavedUnits from './components/units/Sidebar_SavedUnits';
import Mainbar from './components/blocks/Mainbar';
import availableBlocks from './utils/availableBlocks';
import { createNewBlock, addBlockToTree, deleteBlockFromTree, moveBlockInTree, updateBlockOptionsInTree, computeSums } from './utils/blockUtils';


function App() {
  const [droppedBlocks, setDroppedBlocks] = useState([]);
  const [instanceCounter, setInstanceCounter] = useState(0);
  const [unitName, setUnitName] = useState('');
  const [unitKuerzel, setUnitKuerzel] = useState('');
  const [savedUnits, setSavedUnits] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/trainingUnits')
      .then(res => res.json())
      .then(data => setSavedUnits(data))
      .catch(err => console.error(err));
  }, []);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return;
    const dropAreaId = over.id;
    let parentId = null;
    if (dropAreaId !== 'drop-area') {
      parentId = dropAreaId.replace('drop-area-', '');
    }
    const newInstanceId = `inst-${instanceCounter}`;
    const newBlock = createNewBlock(active.data.current.block, newInstanceId);
    setDroppedBlocks(prev => addBlockToTree(prev, parentId, newBlock));
    setInstanceCounter(prev => prev + 1);
  };

  const sums = computeSums(droppedBlocks);
  const sumText = `(${sums.distance}km + ${sums.time}min)`;

  const handleLoad = (unit) => {
    setDroppedBlocks(unit.blocks);
    setUnitName(unit.name);
    setUnitKuerzel(unit.kuerzel);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="app-container">
        <Sidebar_SavedUnits savedUnits={savedUnits} onLoad={handleLoad} />
        
        <Mainbar
          sumText={sumText}
          unitName={unitName}
          setUnitName={setUnitName}
          unitKuerzel={unitKuerzel}
          setUnitKuerzel={setUnitKuerzel}
          droppedBlocks={droppedBlocks}
          setDroppedBlocks={setDroppedBlocks}
          instanceCounter={instanceCounter}
          setInstanceCounter={setInstanceCounter}
          setSavedUnits={setSavedUnits}
        />
        
        <Sidebar_Blocks availableBlocks={availableBlocks} />
      </div>
    </DndContext>
  );
}

export default App;