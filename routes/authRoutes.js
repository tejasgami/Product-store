// File: routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidators');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
