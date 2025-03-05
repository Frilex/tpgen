const availableBlocks = [
    { id: 'aufwaermen', label: 'Aufwärmen', options: { type: 'switch', unitOptions: ["Distanz", "Zeit"] }, color: "#fde2e2" },
    { id: 'tempolauf', label: 'Tempolauf', options: { dropdown: ['1RT', '3RT', '5RT', '10RT', 'HMRT', 'MRT'], unitOptions: ["Distanz", "Zeit"] }, color: "#e2f0cb" },
    { id: 'dauerlauf', label: 'Dauerlauf', options: { dropdown: ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'], unitOptions: ["Distanz", "Zeit"] }, color: "#cde7f0" },
    { id: 'gehpause', label: 'Gehpause', options: { type: 'switch', unitOptions: ["Distanz", "Zeit"] }, color: "#fff3cd" },
    { id: 'trabpause', label: 'Trabpause', options: { type: 'switch', unitOptions: ["Distanz", "Zeit"] }, color: "#d6d8db" },
    { id: 'abkuehlung', label: 'Abkühlung', options: { type: 'switch', unitOptions: ["Distanz", "Zeit"] }, color: "#d1e7dd" },
    { id: 'wiederholung', label: 'Wiederholung', options: { repetitions: 1 }, color: "#f8d7da" }
  ];
  
  export default availableBlocks;