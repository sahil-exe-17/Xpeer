import express from 'express';
import path from 'path';
import cors from 'cors';
import authRoutes from './routes/auth';
import communitiesRoutes from './routes/communities';
import postsRoutes from './routes/posts';
import storeRoutes from './routes/store';
import leaderboardRoutes from './routes/leaderboard';
import aiRoutes from './routes/ai';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/communities', communitiesRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default app;
