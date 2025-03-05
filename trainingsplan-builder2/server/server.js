// backend/server.js
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Hinzugefügt
app.use(express.json());

const db = new Database('training.db');

// Tabelle erstellen, falls sie nicht existiert
db.prepare(`
  CREATE TABLE IF NOT EXISTS trainingUnits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    kuerzel TEXT NOT NULL UNIQUE,
    blocks TEXT NOT NULL
  )
`).run();

// GET alle Trainingseinheiten
app.get('/trainingUnits', (req, res) => {
  const stmt = db.prepare('SELECT * FROM trainingUnits');
  const units = stmt.all().map(u => ({
    id: u.id,
    name: u.name,
    kuerzel: u.kuerzel,
    blocks: JSON.parse(u.blocks)
  }));
  res.json(units);
});

// POST: Neue Trainingseinheit speichern (prüft auf vorhandenes Kürzel)
app.post('/trainingUnits', (req, res) => {
  const { name, kuerzel, blocks } = req.body;
  if (!name || !kuerzel || !blocks) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const exists = db.prepare('SELECT * FROM trainingUnits WHERE kuerzel = ?').get(kuerzel);
  if (exists) {
    return res.status(409).json({ error: 'Kürzel exists', id: exists.id });
  }
  const stmt = db.prepare('INSERT INTO trainingUnits (name, kuerzel, blocks) VALUES (?, ?, ?)');
  const info = stmt.run(name, kuerzel, JSON.stringify(blocks));
  res.json({
    id: info.lastInsertRowid,
    name,
    kuerzel,
    blocks
  });
});

// PUT: Bestehende Trainingseinheit aktualisieren
app.put('/trainingUnits/:id', (req, res) => {
  const { name, kuerzel, blocks } = req.body;
  const id = req.params.id;
  if (!name || !kuerzel || !blocks) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const stmt = db.prepare('UPDATE trainingUnits SET name = ?, kuerzel = ?, blocks = ? WHERE id = ?');
  const info = stmt.run(name, kuerzel, JSON.stringify(blocks), id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ id, name, kuerzel, blocks });
});

// GET: Spezifische Trainingseinheit laden
app.get('/trainingUnits/:id', (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare('SELECT * FROM trainingUnits WHERE id = ?');
  const unit = stmt.get(id);
  if (!unit) {
    return res.status(404).json({ error: 'Not found' });
  }
  unit.blocks = JSON.parse(unit.blocks);
  res.json(unit);
});

// DELETE: Trainingseinheit löschen
app.delete('/trainingUnits/:id', (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare('DELETE FROM trainingUnits WHERE id = ?');
  const info = stmt.run(id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
