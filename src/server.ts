// src/server.ts
// import express from 'express';
// import dotenv from 'dotenv';
// import authRoutes from './routes/auth';

// // import userRoutes from './routes/user';
// // import dashboardRoutes from './routes/dashboard';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.use('/auth', authRoutes);
// // app.use('/user', userRoutes);
// // app.use('/dashboard', dashboardRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Connect to the database, then start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
