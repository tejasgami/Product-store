require('dotenv').config(); // ✅ make sure env is loaded

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

jest.setTimeout(15000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

it('should return 401 for invalid login', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'wrong@example.com', password: 'invalid' });

  expect(res.statusCode).toBe(401);
});
