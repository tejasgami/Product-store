// This script seeds the database with initial products data.
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: 'Smartphone X',
    description: 'Latest model with advanced features',
    price: 999.99,
    category: 'Electronics',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight and comfortable',
    price: 79.99,
    category: 'Sportswear',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Seeding products...');
    await Product.insertMany(products);
    console.log('Products seeded.');
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
