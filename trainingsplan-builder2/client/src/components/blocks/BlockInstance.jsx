import React from 'react';
import DropArea from './DropArea';
import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';

function BlockInstance({ block, onDelete, onMove, onUpdateOptions }) {
  const backgroundColor = block.color || "#ffffff";

  const handleValueChange = (e) => {
    onUpdateOptions(block.instanceId, { value: e.target.value });
  };

  const handleDropdownChange = (e) => {
    onUpdateOptions(block.instanceId, { selectedDropdown: e.target.value });
  };

  const handleRepetitionChange = (e) => {
    onUpdateOptions(block.instanceId, { repetitions: parseInt(e.target.value, 10) });
  };

  const handleNotizChange = (e) => {
    onUpdateOptions(block.instanceId, { notiz: e.target.value });
  };

  const selectedUnit = block.options.selectedUnit || "Distanz";

  const renderUnitSelection = () => {
    return (
      <div className="option-row unit-selection">
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name={`unit-${block.instanceId}`}
              value="Distanz"
              checked={selectedUnit === "Distanz"}
              onChange={() =>
                onUpdateOptions(block.instanceId, { selectedUnit: "Distanz", value: "" })
              }
            />
            Distanz
          </label>
          <label>
            <input
              type="radio"
              name={`unit-${block.instanceId}`}
              value="Zeit"
              checked={selectedUnit === "Zeit"}
              onChange={() =>
                onUpdateOptions(block.instanceId, { selectedUnit: "Zeit", value: "" })
              }
            />
            Zeit
          </label>
        </div>
        <input
          type="number"
          value={block.options.value}
          onChange={handleValueChange}
          className="option-input narrow"
          placeholder=""
        />
        <span className="unit-label">
          {selectedUnit === "Distanz" ? "Km" : selectedUnit === "Zeit" ? "Minuten" : ""}
        </span>
      </div>
    );
  };

  return (
    <div className="block-instance" style={{ backgroundColor }}>
      <div className="block-header">
        {block.id === 'wiederholung' ? (
          <div className="repetition-header">
            <input 
              type="number" 
              value={block.options.repetitions} 
              onChange={handleRepetitionChange} 
              className="option-number narrow-repeat"
            />
            <strong>Wiederholungen</strong>
          </div>
        ) : (
          <strong>{block.label}</strong>
        )}
        <div className="block-controls">
          <button onClick={() => onMove(block.instanceId, -1)} className="btn-move">
            <FaArrowUp />
          </button>
          <button onClick={() => onMove(block.instanceId, 1)} className="btn-move">
            <FaArrowDown />
          </button>
          <button onClick={() => onDelete(block.instanceId)} className="btn-delete">
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="block-content">
        {block.id !== 'wiederholung' && (
          <>
            {(block.id === 'aufwaermen' ||
              block.id === 'gehpause' ||
              block.id === 'trabpause' ||
              block.id === 'abkuehlung') && (
              renderUnitSelection()
            )}
            {block.id === 'tempolauf' && (
              <div className="option-group">
                <div className="option-row">
                  <label className="option-label">
                    Tempobereich:
                    <select
                      value={block.options.selectedDropdown}
                      onChange={handleDropdownChange}
                      className="option-select"
                    >
                      {block.options.dropdown.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                </div>
                {renderUnitSelection()}
              </div>
            )}
            {block.id === 'dauerlauf' && (
              <div className="option-group">
                <div className="option-row">
                  <label className="option-label">
                    Pulsbereich:
                    <select
                      value={block.options.selectedDropdown}
                      onChange={handleDropdownChange}
                      className="option-select"
                    >
                      {block.options.dropdown.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                </div>
                {renderUnitSelection()}
              </div>
            )}
          </>
        )}
        {block.id === 'wiederholung' && (
          <DropArea
            blocks={block.children || []}
            parentId={block.instanceId}
            onDelete={onDelete}
            onMove={onMove}
            onUpdateOptions={onUpdateOptions}
            className="nested-droparea"
          />
        )}
        <div className="option-row">
          <label className="option-label">Notiz:</label>
          <input
            type="text"
            value={block.options.notiz}
            onChange={handleNotizChange}
            className="option-input"
            placeholder="Notiz"
          />
        </div>
      </div>
    </div>
  );
}

export default BlockInstance;