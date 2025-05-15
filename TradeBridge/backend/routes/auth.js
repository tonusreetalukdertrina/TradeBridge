const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();
const sessions = {}; 

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashed, role });
    res.json({ message: 'Registered', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: 'Username might already exist' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = Math.random().toString(36).substr(2);
    sessions[token] = { userId: user._id, role: user.role };
    res.json({ message: 'Logged in', token, role: user.role, userId: user._id });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.get('/session/:token', (req, res) => {
  const session = sessions[req.params.token];
  if (session) {
    res.json({ ...session });
  } else {
    res.status(401).json({ error: 'Invalid session' });
  }
});

module.exports = router;
