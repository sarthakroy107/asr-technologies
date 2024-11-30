import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectDB = async () => {
  try {
    const uri = process.env.DB_URI;

    if (!uri) {
      throw new Error('MongoDB connection URI is missing');
    }

    await mongoose.connect(uri);
    
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
