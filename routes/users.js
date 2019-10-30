const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

// Register route
router.get('/register', (req, res) => {
  res.render('register.ejs');
});

router.post('/register', (req, res) => {
  res.render('register.ejs');
});

module.exports = router;