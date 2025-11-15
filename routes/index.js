const express = require('express');
const router = express.Router();

// Import the songs API router
const songsApi = require('./songsApi');

// Use the songs API routes
router.use('/api', songsApi);

module.exports = router;
