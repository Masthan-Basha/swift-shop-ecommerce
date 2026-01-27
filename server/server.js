import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Configurations & Routes
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// 1. Setup Environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// 2. Database Connection
connectDB();

const app = express();

// 3. Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Matches your React dev server
  credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// 5. Amazon-style "Explore Collection" Helper
// This allows you to serve static images if you store them locally
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 6. Production Ready (Static files for Frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Swift Shop API is running...'));
}

// 7. Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// 8. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🛠️ Mode: ${process.env.NODE_ENV || 'development'}`);
});