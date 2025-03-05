import React, { useState } from 'react';
import { FaFolderOpen, FaTrash } from 'react-icons/fa';

function Sidebar_SavedUnits({ savedUnits, onLoad }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = savedUnits.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.kuerzel.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = async (id) => {
    if (window.confirm('Trainingseinheit wirklich löschen?')) {
      try {
        const res = await fetch(`http://localhost:3001/trainingUnits/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          alert('Gelöscht');
          window.location.reload();
        } else {
          alert('Fehler beim Löschen');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="left-panel">
      <h4 className="sidebar-title">Gespeicherte Trainingseinheiten</h4>
      <input 
        type="text" 
        placeholder="Suchen..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="unit-list">
        {filtered.map(unit => (
          <li key={unit.id} className="unit-item">
            <span>{unit.name} ({unit.kuerzel})</span>
            <div>
              <button onClick={() => onLoad(unit)} className="load-button" title="Öffnen">
                <FaFolderOpen />
              </button>
              <button onClick={() => handleDelete(unit.id)} className="delete-button" title="Löschen">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar_SavedUnits;