const express = require('express');
const router = express.Router(); 
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var verifyAuth = require('../middleware/Auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/tracker', verifyAuth, (req, res) => 
  res.render('tracker', {
    user: req.user  
  })
);



module.exports = router;