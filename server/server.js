const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'users.json');
const userActivityFilePath = path.join(__dirname, 'userActivity.json');
const articlesFilePath = path.join(__dirname, 'articles.json');

let users = [];
if (fs.existsSync(usersFilePath)) {
  const data = fs.readFileSync(usersFilePath);
  users = JSON.parse(data);
}

const saveUsers = () => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const readUserActivity = () => {
  if (!fs.existsSync(userActivityFilePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(userActivityFilePath, 'utf-8'));
};

const writeUserActivity = (data) => {
  fs.writeFileSync(userActivityFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Serve userActivity.json file
app.get('/userActivity', (req, res) => {
  if (fs.existsSync(userActivityFilePath)) {
    res.sendFile(userActivityFilePath);
  } else {
    res.status(404).send('File not found');
  }
});

// Serve articles.json file
app.get('/articles', (req, res) => {
  if (fs.existsSync(articlesFilePath)) {
    res.sendFile(articlesFilePath);
  } else {
    res.status(404).send('File not found');
  }
});

// User registration
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { username, email, password };
  users.push(newUser);
  saveUsers();
  res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful', username: user.username });
});

// Update user activity
app.post('/update-activity', (req, res) => {
  const { username, date, level } = req.body;

  let userActivity = readUserActivity();

  if (!userActivity[username]) {
    userActivity[username] = { articles: {} };
  }

  if (!userActivity[username].articles[date]) {
    userActivity[username].articles[date] = [0, 0, 0]; // Initialize array
  }

  const levelIndex = { beginner: 0, intermediate: 1, advanced: 2 }[level];
  if (levelIndex !== undefined) {
    userActivity[username].articles[date][levelIndex] = 1; // Mark as read
  }

  writeUserActivity(userActivity);
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
