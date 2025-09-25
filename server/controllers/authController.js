import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authController={

login : async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '6h' });

    // set HttpOnly cookie
    res.cookie('token', token, {
  httpOnly: true,
  secure:true, 
  sameSite: 'none', 
  maxAge: 6 * 60 * 60 * 1000,
    });

    res.json({ message: 'Logged in' });
  } catch (err) {
    next(err);
  }
},

logout : async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
}}

export default authController;