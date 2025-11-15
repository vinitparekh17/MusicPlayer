const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper functions to read and write JSON data
function readData() {
  const DB_FILE = path.join(__dirname, '..', 'data', `songs.json`);
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeData(data) {
  const DB_FILE = path.join(__dirname, '..', 'data', `songs.json`);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Get all songs
router.get('/songs/', (req, res) => {
  const data = readData();
  res.json(data);
});

// Get a single song by ID
router.get('/songs/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const song = data.find(s => s.id === parseInt(id));
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});

// POST a new song
router.post('/songs/', (req, res) => {
  const data = readData();
  const newSong = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    songName: req.body.songName,
    filePath: req.body.filePath,
    coverPath: req.body.coverPath
  };
  data.push(newSong);
  writeData(category, data);
  res.status(201).json(newSong);
});

// PUT to update a song by ID
router.put('/songs//:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});

// DELETE a song by ID
router.delete('/songs//:id', (req, res) => {
  const { id } = req.params;
  let data = readData();
  const index = data.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    const deletedSong = data.splice(index, 1);
    writeData(data);
    res.json(deletedSong);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});

module.exports = router;
