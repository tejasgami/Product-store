// File: routes/productRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
// const checkRole = require('../middleware/roleMiddleware'); // Uncomment if you have a role middleware

const {
  getAll,
  create,
  update,
  remove,
} = require('../controllers/productController');

router.get('/', getAll);

// check role middleware
// router.post('/products', authMiddleware, checkRole('admin'), addProduct); // Uncomment if you have a role middleware

router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
