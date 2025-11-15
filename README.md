# Music Player API

A simple Node.js-based API Gateway for managing music playlists with file upload support.

## Project Structure

```bash
cmd: tree ./MusicPlayer -I "node_modules|.git|img|data/songs"
output:
./MusicPlayer
├── data
│   ├── songs
│   │   ├── h0.mp3
│   │   ├── h1.mp3
│   │   ├── h2.mp3
│   │   ├── h3.mp3
│   │   ├── h4.mp3
│   │   ├── h5.mp3
│   │   ├── h6.mp3
│   │   ├── h7.mp3
│   │   ├── h8.mp3
│   │   ├── h9.mp3
│   │   ├── n0.mp3
│   │   ├── n1.mp3
│   │   ├── n2.mp3
│   │   ├── n3.mp3
│   │   ├── n4.mp3
│   │   ├── n5.mp3
│   │   ├── n6.mp3
│   │   ├── n7.mp3
│   │   ├── n8.mp3
│   │   ├── n9.mp3
│   │   ├── r0.mp3
│   │   ├── r10.mp3
│   │   ├── r11.mp3
│   │   ├── r1.mp3
│   │   ├── r2.mp3
│   │   ├── r3.mp3
│   │   ├── r4.mp3
│   │   ├── r5.mp3
│   │   ├── r6.mp3
│   │   ├── r7.mp3
│   │   ├── r8.mp3
│   │   └── r9.mp3
│   └── songs.json
├── gateway.js
├── img
├── package.json
├── package-lock.json
├── README.md
└── routes
    ├── index.js
    └── songsApi.js

5 directories, 39 files

```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The API Gateway will run on `http://localhost:3000`

## Data Structure

Each song has the following normalized structure:
```json
{
  "id": 1,
  "singer": "Arijit Singh",
  "songName": "Khairiyat",
  "category": "romance",
  "filePath": "songs/romance/r0.mp3",
  "coverPath": "img/romance/r0.jpg"
}
```

### Categories
- `romance` - Romantic songs
- `hollywood` - Hollywood songs
- `naughty` - Party songs

## API Endpoints

### GET /api/songs/
Retrieve all songs or filter by category

**Get all songs:**
```bash
curl -X GET http://localhost:3000/api/songs/
```

**Filter by category:**
```bash
curl -X GET "http://localhost:3000/api/songs/?category=romance"
curl -X GET "http://localhost:3000/api/songs/?category=hollywood"
curl -X GET "http://localhost:3000/api/songs/?category=naughty"
```

### GET /api/songs/:id
Retrieve a single song by ID

```bash
curl -X GET http://localhost:3000/api/songs/1
```

### POST /api/songs/
Add a new song (JSON only)

```bash
curl -i -X POST http://localhost:3000/api/songs/ \
  -H "Content-Type: application/json" \
  -d '{"singer": "Artist Name", "songName": "New Song", "category": "romance", "filePath": "songs/r12.mp3", "coverPath": "img/r12.jpg"}'
```

### POST /api/songs/upload
Upload a new song with files (song file and thumbnail image)

```bash
curl -i -X POST http://localhost:3000/api/songs/upload \
  -F "singer=Arijit Singh" \
  -F "songName=New Song" \
  -F "category=romance" \
  -F "song=@/path/to/song.mp3" \
  -F "thumbnail=@/path/to/image.jpg"
```

**Note:**
- The `song` field is required (MP3 file)
- The `thumbnail` field is optional (JPG/PNG image)
- Files will be automatically saved to `data/songs/` and `img/`
- File paths will be automatically generated and stored in JSON
- If category is not specified, defaults to 'romance'

### PUT /api/songs/:id
Update an existing song by ID

```bash
curl -i -X PUT http://localhost:3000/api/songs/1 \
  -H "Content-Type: application/json" \
  -d '{"songName": "Updated Song Name"}'
```

### DELETE /api/songs/:id
Delete a song by ID

```bash
curl -X DELETE http://localhost:3000/api/songs/1
```

## Features

- RESTful API with full CRUD operations
- File upload support for songs and thumbnails
- Normalized data structure with separate singer, song name, and category fields
- Category-based filtering
- Automatic file naming and path generation
- JSON-based data storage
- Simple and minimal architecture (perfect for student projects)
