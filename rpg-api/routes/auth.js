const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();


console.log("oiiiii")
router.post('/login', AuthController.login);
router.post('/register', AuthController.registro);

module.exports = router;
