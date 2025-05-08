// This script is used to drop the collections in the database before seeding new data.
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB for migration...');

    await User.collection.drop().catch(() => {});
    await Product.collection.drop().catch(() => {});

    console.log('Collections dropped successfully');
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
