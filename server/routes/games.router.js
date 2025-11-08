//Import
import express from 'express';
import pool from '../modules/pool.js';
import { Connection } from 'pg';

// Mount
const router = express.Router();

//Middleware
router.use(express.json());

// Create

// Post  api/games/create

router.post('/', async (req, res) => {
  const { title, description, image, genre } = req.body;

  // basic validation
  if (!title || !description || !image || !genre) {
    console.log(req.body);

    return res.sendStatus(400);
  }

  const queryText = `
      INSERT INTO games (title, description, image, genre)
      VALUES ($1, $2, $3, $4);
    `;

  try {
    await pool.query(queryText, [title, description, image, genre]);
    return res.sendStatus(201);
  } catch (error) {
    console.error('Error inserting game', error);
    return res.sendStatus(500);
  }
});

// Read

// GET api/games - returns all games
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "games";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

export default router;
