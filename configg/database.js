const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/secure-portal';

async function connectDB() {
  try {
    // Mongoose v7+ no longer requires useNewUrlParser/useUnifiedTopology.
    // Set a short serverSelectionTimeoutMS so missing MongoDB fails fast with a clear message.
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
}

module.exports = connectDB;
