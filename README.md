# Music Player API

A simple Node.js-based API Gateway for managing music playlists with file upload support.

## Project Structure

```
./MusicPlayer
├── data
│   ├── songs/              // Uploaded song files (organized by category)
│   │   ├── romance/
│   │   ├── hollywood/
│   │   └── naughty/
│   └── songs.json          // Song database
├── gateway.js              // Main API server
├── img/                    // Thumbnail images (organized by category)
│   ├── romance/
│   ├── hollywood/
│   └── naughty/
├── package.json
└── routes
    ├── index.js            // Main router
    └── songsApi.js         // Song API logic
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
  -d '{"singer": "Artist Name", "songName": "New Song", "category": "romance", "filePath": "songs/romance/r12.mp3", "coverPath": "img/romance/r12.jpg"}'
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
- Files will be automatically saved to `data/songs/{category}/` and `img/{category}/`
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
