const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  sqlQuery = `
  SELECT * FROM "deck"
  ORDER BY "id";
  `;

  pool
    .query(sqlQuery)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error fetching tarot deck:", err);
      res.sendStatus(500);
    });
});


router.post("/", async (req, res) => {
    let connection;

  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");
    
   await Promise.all(
    req.body.map((data) => {
      const { name, suit, value, description } = data;
      const sqlQuery = `
        INSERT INTO "deck"
            ("name", "suit", "value", "description")
            VALUES
            ($1, $2, $3, $4)
            `;
      const sqlValues = [name, suit, value, description];
      return connection.query(sqlQuery, sqlValues)
    })
)

    await connection.query("COMMIT;");
    res.sendStatus(201);
  } catch (err) {
    console.log("POST /api/tarot failed:", err);
    await connection.query("ROLLBACK;");
    res.sendStatus(500);
  } finally {
    await connection.release();
  }
});

module.exports = router;
