const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Set our api routes
app.use('/api', require('./server/routes/api'));

// For all GET requests, send back the compiled index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Get port from environment and start listening
const port = process.env.PORT || 5000;
app.set('port', port);

// Database
const database = require('./server/database');
database.connect((err) => {
  if (err)
    console.error("Error connecting to MongoDB: " + err);
  else {
    const server = http.createServer(app);
    server.listen(port, () => console.log(`API running on localhost:${port}`));
  }
});
