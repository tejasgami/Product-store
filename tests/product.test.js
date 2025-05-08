require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Create a test user manually
  const user = new User({
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'test1234',
  });
  await user.save();

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // Seed products
  await Product.insertMany([
    { name: 'iPhone 14', description: 'Apple iPhone 14', price: 1000, category: 'Electronics' },
    { name: 'iPhone 15', description: 'Apple iPhone 15', price: 2000, category: 'Electronics' },
    { name: 'iPhone 16', description: 'Apple iPhone 16', price: 3000, category: 'Electronics' },
  ]);
});

afterAll(async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
  await mongoose.disconnect();
});

describe('Product API', () => {
  it('should create a product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'iPhone 16 Pro',
        description: 'iPhone Great product',
        price: 19.99,
        category: 'Electronics',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe('iPhone 16 Pro');
  });

  it('should fetch all products with pagination', async () => {
    const res = await request(app).get('/api/products?page=1&limit=2');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data.products)).toBe(true);
    expect(res.body.data.products.length).toBeLessThanOrEqual(2);
  });

  it('should filter products by category', async () => {
    const res = await request(app).get('/api/products?category=Electronics');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.products.every(p => p.category === 'Electronics')).toBe(true);
  });

  it('should search products by name', async () => {
    const res = await request(app).get('/api/products?page=1&limit=5&search=iPhone');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.products.length).toBeGreaterThan(0);
    expect(res.body.data.products[0].name).toMatch(/iPhone/i);
  });
});
