const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

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
        const { name, suit, value, description_up, description_reversed } =
          data;
        const sqlQuery = `
        INSERT INTO "deck"
            ("name", "suit", "value", "description_up", "description_reversed")
            VALUES
            ($1, $2, $3, $4, $5)
            `;
        const sqlValues = [
          name,
          suit,
          value,
          description_up,
          description_reversed,
        ];
        return connection.query(sqlQuery, sqlValues);
      })
    );

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

router.post("/3-spread", (req, res) => {
  const {
    card_one,
    card_one_orientation,
    card_two,
    card_two_orientation,
    card_three,
    card_three_orientation,
  } = req.body;

  const user = req.user.id;

  const sqlQuery = `
      INSERT INTO "spread_history"
      ("user", "card_one", "card_one_orientation", "card_two", "card_two_orientation", "card_three", "card_three_orientation")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7);
      `;

  const sqlText = [
    user,
    card_one,
    card_one_orientation,
    card_two,
    card_two_orientation,
    card_three,
    card_three_orientation,
  ];

  pool
    .query(sqlQuery, sqlText)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Database error sending spread:", err);
      res.sendStatus(500);
    });
});

router.get("/3-history", (req, res) => {
  const user = req.user.id;

  const sqlQuery = `
  SELECT
    sh.id AS spread_id,
    sh.user,
    d1.name AS card_one_name,
    sh.card_one_orientation,
    d2.name AS card_two_name,
    sh.card_two_orientation,
    d3.name AS card_three_name,
    sh.card_three_orientation,
    sh.date_spread_drawn
FROM
    spread_history sh
LEFT JOIN deck d1 ON sh.card_one = d1.id
LEFT JOIN deck d2 ON sh.card_two = d2.id
LEFT JOIN deck d3 ON sh.card_three = d3.id
WHERE
    sh.user = $1
ORDER BY
    sh.date_spread_drawn;
  `;

  pool
    .query(sqlQuery, [user])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error fetching 3-spread history", err);
      res.sendStatus(500);
    });
});

module.exports = router;
