const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.registro);

module.exports = router;
