const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.body.category || "romance";
    if (file.fieldname === "song") {
      const songDir = path.join(__dirname, "..", "data", "songs", category);
      if (!fs.existsSync(songDir)) fs.mkdirSync(songDir, { recursive: true });
      cb(null, songDir);
    } else if (file.fieldname === "thumbnail") {
      const imgDir = path.join(__dirname, "..", "img", category);
      if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
      cb(null, imgDir);
    }
  },
  filename: function (req, file, cb) {
    const category = req.body.category || "romance";
    const data = readData();
    const categoryPrefix = category.charAt(0);
    const existingSongs = data.filter((s) => s.category === category);
    const nextIndex = existingSongs.length;
    const ext = path.extname(file.originalname);
    cb(null, `${categoryPrefix}${nextIndex}${ext}`);
  },
});

const upload = multer({ storage: storage });

// Helper functions to read and write JSON data
function readData() {
  const DB_FILE = path.join(__dirname, "..", "data", `songs.json`);
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeData(data) {
  const DB_FILE = path.join(__dirname, "..", "data", `songs.json`);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 4), "utf8");
}

// Get all songs or filter by category
router.get("/songs/", (req, res) => {
  const data = readData();
  const { category } = req.query;

  if (category) {
    const filtered = data.filter((s) => s.category === category);
    res.json(filtered);
  } else {
    res.json(data);
  }
});

// Get a single song by ID
router.get("/songs/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const song = data.find((s) => s.id === parseInt(id));
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

// POST a new song (JSON only)
router.post("/songs/", (req, res) => {
  const data = readData();
  const newSong = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    singer: req.body.singer,
    songName: req.body.songName,
    category: req.body.category || "romance",
    filePath: req.body.filePath,
    coverPath: req.body.coverPath,
  };
  data.push(newSong);
  writeData(data);
  res.status(201).json(newSong);
});

// POST a new song with file uploads
router.post(
  "/songs/upload",
  upload.fields([
    { name: "song", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  (req, res) => {
    const data = readData();
    const category = req.body.category || "romance";
    const nextId = data.length ? data[data.length - 1].id + 1 : 1;

    const songFile = req.files["song"] ? req.files["song"][0] : null;
    const thumbFile = req.files["thumbnail"] ? req.files["thumbnail"][0] : null;

    if (!songFile) {
      return res.status(400).json({ message: "Song file is required" });
    }

    const newSong = {
      id: nextId,
      singer: req.body.singer,
      songName: req.body.songName,
      category: category,
      filePath: `data/songs/${category}/${songFile.filename}`,
      coverPath: thumbFile ? `img/${category}/${thumbFile.filename}` : "",
    };

    data.push(newSong);
    writeData(data);
    res.status(201).json(newSong);
  }
);

// PUT to update a song by ID
router.put("/songs/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex((s) => s.id === parseInt(id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

router.put("/songs/:id/upload", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex((s) => s.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Song not found" });
  }

  const existingSong = data[index];
  const songFile = req.files["song"] ? req.files["song"][0] : null;
  const thumbFile = req.files["thumbnail"] ? req.files["thumbnail"][0] : null;

  // If a new song file is uploaded, delete the old one
  if (songFile && existingSong.filePath) {
    const oldSongPath = path.join(__dirname, "..", existingSong.filePath);
    if (fs.existsSync(oldSongPath)) {
      try {
        fs.unlinkSync(oldSongPath);
        console.log(`Deleted old song file: ${oldSongPath}`);
      } catch (err) {
        console.error(`Error deleting old song file: ${err.message}`);
      }
    }
  }

  // If a new thumbnail is uploaded, delete the old one
  if (thumbFile && existingSong.coverPath) {
    const oldCoverPath = path.join(__dirname, "..", existingSong.coverPath);
    if (fs.existsSync(oldCoverPath)) {
      try {
        fs.unlinkSync(oldCoverPath);
        console.log(`Deleted old cover file: ${oldCoverPath}`);
      } catch (err) {
        console.error(`Error deleting old cover file: ${err.message}`);
      }
    }
  }

  // Update the song data
  const updatedSong = {
    ...existingSong,
    singer: req.body.singer || existingSong.singer,
    songName: req.body.songName || existingSong.songName,
    category: req.body.category || existingSong.category,
    filePath: songFile
      ? `data/songs/${existingSong.category}/${songFile.filename}`
      : existingSong.filePath,
    coverPath: thumbFile
      ? `img/${existingSong.category}/${thumbFile.filename}`
      : existingSong.coverPath,
  };

  data[index] = updatedSong;
  writeData(data);
  res.json(updatedSong);
});
// DELETE a song by ID
router.delete("/songs/:id", (req, res) => {
  const { id } = req.params;
  let data = readData();
  const index = data.findIndex((s) => s.id === parseInt(id));
  if (index !== -1) {
    const song = data[index];
    // Delete the song file if it exists
    if (song.filePath) {
      const songFilePath = path.join(__dirname, "..", song.filePath);
      if (fs.existsSync(songFilePath)) {
        try {
          fs.unlinkSync(songFilePath);
          console.log(`Deleted song file: ${songFilePath}`);
        } catch (err) {
          console.error(`Error deleting song file: ${err.message}`);
        }
      }
    }
    const deletedSong = data.splice(index, 1);
    writeData(data);
    res.json(deletedSong);
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

module.exports = router;
