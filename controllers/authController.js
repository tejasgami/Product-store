const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { successResponse, errorResponse } = require('../utils/helper');
const { validationResult } = require('express-validator');

// Register API function
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Check if the user is an admin
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return errorResponse(res, 'Email already in use', 'Conflict', 409);
    }
  
    const user = new User({ firstName, lastName, email, password });
    await user.save(); // Password hashing middleware

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    successResponse(res, { userId: user._id, token }, 'User registered successfully', 201);
  } catch (err) {
    console.error(err);
    errorResponse(res, err, 'Error during registration. Please try again...', 500);
  }
};

// Login API function
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return errorResponse(res, 'Invalid credentials', 'Unauthorized', 401);
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  successResponse(res, { token }, 'Login successful', 200);
};
