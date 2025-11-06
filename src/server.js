import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Task Manager API is running 🚀');
});

// Tasks route
app.use('/api/tasks', taskRoutes);

// Health check - confirms the server is running
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Service is alive' });
});

// Readiness check - confirms the app can reach the database
import pool from './db.js';

app.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ready' });
  } catch (err) {
    res.status(500).json({ status: 'not_ready', error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));