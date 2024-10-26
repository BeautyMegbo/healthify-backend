const express = require('express');
const app = express();

// Middleware to detect potential security threats
app.use((req, res, next) => {
  const { headers, body, query } = req;
  // Example: Check for SQL injection patterns
  if (/['"=;]/.test(query) || /['"=;]/.test(body)) {
    return res.status(400).send('Bad request. Potential threat detected.');
  }
  next();
});

module.exports = app;
