// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = []; // This is just for demonstration. In production, use a database.

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, email, password });
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
