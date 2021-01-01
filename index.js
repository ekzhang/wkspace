import express from 'express';
import path from 'path';
import http from 'http';

import api from './server/routes/api.js';
import { connect } from './server/database.js';

const dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

// Parsers for POST data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static(path.join(dirname, 'client/build')));

// Set our api routes
app.use('/api', api);

// For all GET requests, send back the compiled index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(dirname, 'client/build/index.html'));
});

// Get port from environment and start listening
const port = process.env.PORT || 5000;
app.set('port', port);

// Database
connect((err) => {
  if (err) console.error('Error connecting to MongoDB: ' + err);
  else {
    const server = http.createServer(app);
    server.listen(port, () => console.log(`API running on localhost:${port}`));
  }
});
