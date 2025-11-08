import express from 'express';
import pool from '../modules/pool.js';

const router = express.Router();

// GET /api/users - return all users
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "users";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// POST /api/users - create a new user
router.post('/', (req, res) => {
  const { username, email } = req.body || {};

  // Basic validation
  if (!username || typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({ error: 'username is required and must be a non-empty string' });
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'email is required and must be a non-empty string' });
  }

  const usernameTrim = username.trim();
  const emailTrim = email.trim();

  // simple email regex (covers common cases)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrim)) {
    return res.status(400).json({ error: 'email is not a valid email address' });
  }

  const queryText = `INSERT INTO "users" ("username", "email") VALUES ($1, $2) RETURNING *;`;
  pool
    .query(queryText, [usernameTrim, emailTrim])
    .then((result) => res.status(201).send(result.rows[0]))
    .catch((error) => {
      console.error('Error inserting user:', error);
      res.sendStatus(500);
    });
});

export default router;
