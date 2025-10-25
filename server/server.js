//. && nodemon --exec tsx ./server/server.ts

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Routes
import gamesRouter from './routes/games.router.js';

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/games', gamesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
