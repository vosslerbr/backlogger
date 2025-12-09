//* ROUTES FOR GAMES TABLE

//Import
import express from 'express';
import pool from '../modules/pool.js';

// Mount
const router = express.Router();

//Middleware
router.use(express.json());

//*CREATE

//^POST api/games
// Creates new game in games table
router.post('/', async (req, res) => {
  const { title, description, image, genre } = req.body;

  // Validation
  if (!title || !description || !image || !genre) {
    console.error(`Error validating request - Request body: ${req.body}`);
    return res.sendStatus(400);
  }
  // SQL
  const query = `
      INSERT INTO games (title, description, image, genre)
      VALUES ($1, $2, $3, $4);
    `;

  //Query DB
  try {
    await pool.query(query, [title, description, image, genre]);
    return res.status(201).json({ added: req.body });
  } catch (error) {
    console.error('Error inserting game', error);
    return res.sendStatus(500);
  }
});

//*READ

//^GET api/games
//Returns all games
router.get('/', (req, res) => {
  // SQL
  const query = `SELECT * FROM "games";`;

  // Query DB
  pool
    .query(query)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//^ GET api/games/search/title
// Returns fuzzy-match based on title
router.get('/search/title', async (req, res) => {
  //Deconstruct title from quest
  const { title } = req.body;

  // SQL
  const query = `SELECT * FROM "games" WHERE title LIKE ($1 || '%');`;

  // Validation
  if (typeof title !== 'string' || !title.trim()) {
    return res
      .status(400)
      .json({ error: 'Title must be a String', request: req.body });
  }

  // Query DB
  await pool
    .query(query, [title])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//^ GET api/games/search/genre
// Returns all games by Genre
router.get('/search/genre', async (req, res) => {
  // Deconstruct genre from request body
  const { genre } = req.body;

  // SQL
  const query = `SELECT * FROM "games" WHERE genre = $1;`;

  // Validation
  if (typeof genre !== 'string' || !genre.trim()) {
    return res.status(400).json({ error: 'genre is not a string' });
  }
  // Query DB
  await pool
    .query(query, [genre])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//TODO Create ID lookup by title
//^ GET api/games/search/id_lookup
// Returns game ID by title

//* UPDATE

//^ PUT api/games/update/
// Update all columns for ID
router.put('/update', async (req, res) => {
  //Deconstruct from post body
  const { id, title, description, image, genre } = req.body;

  // Validation
  // Check if ID is empty or NAN, or missing
  if (!id || typeof id !== 'number') {
    return res.status(400).json({
      error: 'Improper ID - either missing, empty, or NAN',
      id: `${id}`,
    });
  }

  // SQL
  const query =
    'UPDATE games SET title = $2, description = $3, image = $4, genre = $5 WHERE id = $1';

  //Query DB
  try {
    await pool.query(query, [id, title, description, image, genre]);
    return res.status(201).json({
      message: `${id} updated`,
      data: `title: ${title}, description: ${description}, image: ${image}, genre: ${genre}`,
    });
  } catch (error) {
    console.error('Error updating game', error);
    return res.sendStatus(500);
  }
});

//^ PUT api/games/update/title
// Update title for ID

router.put('/update/title', async (req, res) => {
  // Deconstruct from post body
  const { id, title } = req.body;

  //Validation
  //Check if ID is empty/NAN or if title is empty/not a string
  if (!id || typeof id !== 'number') {
    return res.status(400).json({
      error: 'Malformed request - check ID (is number) and title (is string)',
      request: `id: ${id}, title: ${title}`,
    });
  }
  //SQL
  const query = 'UPDATE games SET title = $2 WHERE id = $1';

  try {
    await pool.query(query, [id, title]);
    return res.status(201).json({
      message: `ID ${id} updated`,
      data: `title: ${title}`,
    });
  } catch (error) {
    console.error('Error updating game title', error);
    return res.sendStatus(500);
  }
});

//^ PUT api/games/update/description
// Update description for ID

router.put(`/update/description`, async (req, res) => {
  const { id, description } = req.body;

  if (!id || typeof id !== 'number') {
    return res.status(400).json({
      error:
        'Malformed request - check ID (is number) and description (is string)',
    });
  }
  const query = 'UPDATE games SET description = $2 WHERE id = $1';

  try {
    await pool.query(query, [id, description]);
    return res.status(201).json({
      message: `ID: ${id} updated`,
      data: `Description: ${description}`,
    });
  } catch (error) {
    console.error('Error updating description', error);
    return res.sendStatus(500);
  }
});

//^ PUT api/games/update/image
// Update image for ID

router.put(`/update/image`, async (req, res) => {
  const { id, image } = req.body;

  if (!id || typeof id !== 'number') {
    return res.status(400).json({
      error: 'Malformed request - check ID (is number) and image (is string)',
    });
  }
  const query = 'UPDATE games SET image = $2 WHERE id = $1';

  try {
    await pool.query(query, [id, image]);
    return res.status(201).json({
      message: `ID: ${id} updated`,
      data: `Image: ${image}`,
    });
  } catch (error) {
    console.error('Error updating image', error);
    return res.sendStatus(500);
  }
});

//^ PUT api/games/update/genre
// Update genre for ID

router.put(`/update/genre`, async (req, res) => {
  const { id, genre } = req.body;

  if (!id || typeof id !== 'number' || !genre || typeof genre !== 'string') {
    return res.status(400).json({
      error: 'Malformed request - check ID (is number) and genre (is string)',
    });
  }
  const query = 'UPDATE games SET genre = $2 WHERE id = $1';

  try {
    await pool.query(query, [id, genre]);
    return res.status(201).json({
      message: `ID: ${id} updated`,
      data: `genre: ${genre}`,
    });
  } catch (error) {
    console.error('Error updating genre', error);
    return res.sendStatus(500);
  }
});

// * DELETE

//^ DELETE api/games/delete
// Delete entire game

router.delete(`/delete`, async (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  if (!id || typeof id !== 'number') {
    return res.status(400).json({
      error: 'Malformed request - check ID (is number)',
      ID: `${id}`,
    });
  }
  // Delete the row and return the deleted row if present
  const query = 'DELETE FROM games WHERE id = $1 RETURNING *';

  try {
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Row ${id} not found` });
    }
    return res
      .status(200)
      .json({ message: `Row ${id} deleted`, deleted: result.rows[0] });
  } catch (error) {
    console.error('Error deleting game', error);
    return res.sendStatus(500);
  }
});

//^DELETE api/games/delete/title
//Delete title from game

//^DELETE api/games/delete/description
//Delete description from game

//^DELETE api/games/delete/image
//Delete image from game

//^DELETE api/games/delete/genre
//Delete genre from game

export default router;

// //template
// router.get('route', (req, res) => {
//   // Deconstruct genre from request body
//   // SQL
//   // Validation
//   // Query DB
// });
