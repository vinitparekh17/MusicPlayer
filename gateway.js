const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Import the main router
const routes = require('./routes');
app.use('/', routes);

// Start the API Gateway server
app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
