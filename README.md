# Music Player API

A simple Node.js-based API Gateway for managing music playlists.

## Project Structure

```
MusicPlayer/
├── gateway.js          // Main API gateway server
├── /routes/
│   └── index.js        // Router to handle API routes
│   └── songsApi.js     // Song API logic to handle HTTP verbs
├── /data/
│   └── romance.json    // Romance songs database
│   └── hollywood.json  // Hollywood songs database
│   └── naughty.json    // Naughty songs database
└── package.json
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

## API Endpoints

### GET /api/songs/:category
Retrieve all songs from a category (romance, hollywood, naughty)

```bash
curl -X GET http://localhost:3000/api/songs/romance
```

### GET /api/songs/:category/:id
Retrieve a single song by ID and category

```bash
curl -X GET http://localhost:3000/api/songs/romance/1
```

### POST /api/songs/:category
Add a new song to a category

```bash
curl -i -X POST http://localhost:3000/api/songs/hollywood -H "Content-Type: application/json" -d '{"songName": "New Song", "filePath": "../songs/hollywood/h10.mp3", "coverPath": "../img/hollywood/h10.jpg"}'
```

### PUT /api/songs/:category/:id
Update an existing song by ID

```bash
curl -i -X PUT http://localhost:3000/api/songs/romance/1 -H "Content-Type: application/json" -d '{"songName": "Updated Song Name"}'
```

### DELETE /api/songs/:category/:id
Delete a song by ID

```bash
curl -X DELETE http://localhost:3000/api/songs/hollywood/1
```

## Categories

- `romance` - Romantic songs
- `hollywood` - Hollywood songs
- `naughty` - Party songs
