const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

var dirToServe = path.join(__dirname, '..', 'dist', 'app');
var port = process.env.PORT || 8080;

// Run the app by serving the static files
// in the dist directory
app.use('/', express.static(dirToServe));

// Start the app by listening on the default
// Heroku port
app.listen(port);

console.log(`Serving ${dirToServe} on port ${port}`);

fs.readdir(dirToServe, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})
