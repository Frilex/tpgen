import React from 'react';
import DropArea from './DropArea';
import { deleteBlockFromTree, moveBlockInTree, updateBlockOptionsInTree } from '../../utils/blockUtils';

const Mainbar = ({
  sumText,
  unitName,
  setUnitName,
  unitKuerzel,
  setUnitKuerzel,
  droppedBlocks,
  setDroppedBlocks,
  instanceCounter,
  setInstanceCounter,
  setSavedUnits
}) => {
  const handleKuerzelChange = (e) => {
    setUnitKuerzel(e.target.value.replace(/\s/g, ''));
  };

  const handleSave = async () => {
    const trainingUnit = {
      name: unitName,
      kuerzel: unitKuerzel,
      blocks: droppedBlocks
    };
    try {
      let res = await fetch('http://localhost:3001/trainingUnits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainingUnit)
      });
      if (res.status === 409) {
        const data = await res.json();
        if (window.confirm('Eine Einheit mit diesem Kürzel existiert bereits. Überschreiben?')) {
          res = await fetch(`http://localhost:3001/trainingUnits/${data.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trainingUnit)
          });
          if (!res.ok) {
            alert('Fehler beim Überschreiben.');
            return;
          }
          alert('Trainingseinheit überschrieben!');
        } else {
          return;
        }
      } else if (!res.ok) {
        alert('Fehler beim Speichern.');
        return;
      } else {
        alert('Trainingseinheit gespeichert!');
      }
      const updated = await fetch('http://localhost:3001/trainingUnits');
      const data = await updated.json();
      setSavedUnits(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = (instanceId) => {
    setDroppedBlocks(prev => deleteBlockFromTree(prev, instanceId));
  };

  const handleMove = (instanceId, direction) => {
    setDroppedBlocks(prev => moveBlockInTree(prev, instanceId, direction));
  };

  const handleUpdateOptions = (instanceId, newOptions) => {
    setDroppedBlocks(prev => updateBlockOptionsInTree(prev, instanceId, newOptions));
  };

  return (
    <div className="middle-panel">
      <h3 className="main-title">
        Trainingseinheit {sumText}
      </h3>
      <div className="unit-info">
        <label>
          Name:
          <input
            type="text"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            className="info-input"
          />
        </label>
        <label>
          Kürzel:
          <input
            type="text"
            value={unitKuerzel}
            onChange={handleKuerzelChange}
            className="info-input"
          />
        </label>
        <button onClick={handleSave} className="save-button">
          Speichern
        </button>
      </div>
      <DropArea 
        blocks={droppedBlocks} 
        parentId={null}
        onDelete={handleDelete}
        onMove={handleMove}
        onUpdateOptions={handleUpdateOptions}
      />
    </div>
  );
};

export default Mainbar;