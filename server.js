const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/Config/db');
const authRoutes = require('./src/Routes/authRoutes');
const bookRoutes = require('./src/Routes/bookRoutes');
const borrowRoutes = require('./src/Routes/borrowRoutes');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));