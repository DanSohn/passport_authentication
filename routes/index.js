const express = require('express');
const router = express.Router();


// Home page
router.get('/', (req,res) => res.render('welcome'));
// Dashboard
router.get('/dashboard', (req, res) => res.render('dashboard'));
module.exports = router;