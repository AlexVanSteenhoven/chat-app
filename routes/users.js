const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

// Register route
router.get('/register', (req, res) => {
  res.render('register.ejs');
});

// Handle registration
router.post('/register', (req, res) => {
  console.log(req.body);
  res.send('HELLOO');
});

module.exports = router;