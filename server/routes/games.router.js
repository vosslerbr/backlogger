import express from "express";
import pool from "../modules/pool.js";

const router = express.Router();

router.get("/", (req, res) => {
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
