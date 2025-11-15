# Music Player API

A simple Node.js-based API Gateway for managing music playlists.

## Project Structure

```
./MusicPlayer
├── data
│   ├── songs
│   │   ├── [song_name].mp3
│   └── songs.json
├── gateway.js
├── img
├── package.json
├── package-lock.json
├── README.md
└── routes
    ├── index.js
    └── songsApi.js
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

### GET /api/songs/
Retrieve all songs

```bash
curl -X GET http://localhost:3000/api/songs/
```

### GET /api/songs/:id
Retrieve a single song by ID
```bash
curl -X GET http://localhost:3000/api/songs/1
```

### POST /api/songs/
Add a new song

```bash
curl -i -X POST http://localhost:3000/api/songs/ -H "Content-Type: application/json" -d '{"songName": "New Song", "filePath": "../songs/hollywood/h10.mp3", "coverPath": "../img/hollywood/h10.jpg"}'
```

### PUT /api/songs/:id
Update an existing song by ID

```bash
curl -i -X PUT http://localhost:3000/api/songs/1 -H "Content-Type: application/json" -d '{"songName": "Updated Song Name"}'
```

### DELETE /api/songs/:id
Delete a song by ID

```bash
curl -X DELETE http://localhost:3000/api/songs/1
```