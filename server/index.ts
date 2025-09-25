import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDb from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';
declare global {
  namespace Express {
    interface Request {
      io: SocketIOServer;
    }
  }
}
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }
});
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// attach io so controllers can emit: req.io
app.use((req, res, next) => { req.io = io; next(); });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


// serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDb();

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

app.get('/', (req, res) => {
    res.send('API is running...');
})
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
