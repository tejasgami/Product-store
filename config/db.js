// Database connection logic for a MongoDB database using Mongoose and function that connects to the database using the connection string stored in an environment variable

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
