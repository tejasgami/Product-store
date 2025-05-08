// This script seeds the database with initial user data.
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const users = [
  {
    email: 'admin@example.com',
    password: 'admin123',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Seeding users...');
    for (const data of users) {
      const user = new User(data);
      await user.save();
    }
    console.log('Users seeded.');
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
