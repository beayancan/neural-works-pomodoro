import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import pomodoroRoutes from './routes/pomodoroRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())

app.use('/', userRoutes);
app.use('/', pomodoroRoutes);
app.use('/', authRoutes);

export default app;
