// This file defines a Mongoose schema and model for a Product entity.
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    description: String,
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
