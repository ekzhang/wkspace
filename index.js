import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import http from 'http';

import api from './server/routes/api.js';

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
const databaseUri =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017/workspace-db';

mongoose
  .connect(databaseUri)
  .then(() => {
    console.log('Connected to MongoDB.');
    const server = http.createServer(app);
    server.listen(port, () => console.log(`API running on localhost:${port}`));
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ' + err);
  });
