const Product = require('../models/Product');
const { successResponse, errorResponse } = require('../utils/helper');
const { validationResult } = require('express-validator');

// Get all products API function that fetches all products from the database with optional pagination and search functionality
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // case-insensitive name filter
    }

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    successResponse(res, {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    errorResponse(res, err, 'Failed to fetch products');
  }
};


// Create/Add new product API function
exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    
    const { name } = req.body;
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return errorResponse(res, 'Product already exists', 'Conflict', 409);
    }
    // Check if the user is an admin
    // if (req.user.role !== 'admin') {
    //   return errorResponse(res, 'Access denied', 'Forbidden', 403);
    // }
    // Create a new product 
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id,
    });
    successResponse(res, product, 'Product created', 201);
  } catch (err) {
    errorResponse(res, err, 'Error adding new product. Please try again...', 400);
  }
};

// Update product API function
exports.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    // Check if the user is an admin
    // if (req.user.role !== 'admin') {
    //   return errorResponse(res, 'Access denied', 'Forbidden', 403);
    // }
    
    // Check if the product exists
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return errorResponse(res, 'Product not found', 'Not Found', 404);
    }
    // Check if the product name already exists
    const { name } = req.body;
    const productWithSameName = await Product.findOne({ name });
    if (productWithSameName && productWithSameName._id.toString() !== req.params.id) {
      return errorResponse(res, 'Product with this name already exists', 'Conflict', 409);
    }
   
    // Update the product
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true,
    });
    if (!product) return errorResponse(res, 'Product not found', 'Not Found', 404);

    console.log(`Product updated: ${product.id}`);
    successResponse(res, product, 'Product updated successfully', 200);
  } catch (err) {
    errorResponse(res, err, 'Error updating product. Please try again...', 400);
  }
};

// Delete product API function
exports.remove = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return errorResponse(res, 'Product not found', 'Not Found', 404);
    }

    // if (req.user.role !== 'admin') { 
    //   return errorResponse(res, 'Access denied', 'Forbidden', 403);
    // }
    
    await Product.findByIdAndDelete(req.params.id);
    successResponse(res, { message: 'Product Deleted' }, 'Product deleted successfully', 200);
  } catch (err) {
    errorResponse(res, err, 'Error deleting product. Please try again...', 400);
  }
};
