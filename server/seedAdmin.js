import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/db.js';
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';

(async () => {
  await connectDb(process.env.MONGO_URI || 'mongodb://localhost:27017/orderdb');
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'password123', 12);
  await Admin.create({ username: process.env.ADMIN_USERNAME || 'admin', passwordHash: hash });
  console.log('Admin created');
  process.exit(0);
})();
