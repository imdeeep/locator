const express = require('express');
const router = express.Router();
const { signup,login,getCurrentUser } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', getCurrentUser);

module.exports = router;
