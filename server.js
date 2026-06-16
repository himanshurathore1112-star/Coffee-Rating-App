const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS coffees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      votes INTEGER DEFAULT 0
    )
  `);

  db.run("INSERT OR IGNORE INTO coffees VALUES (1, 'Espresso', 0)");
  db.run("INSERT OR IGNORE INTO coffees VALUES (2, 'Latte', 0)");
  db.run("INSERT OR IGNORE INTO coffees VALUES (3, 'Cappuccino', 0)");
});

app.get("/coffees", (req, res) => {
  db.all("SELECT * FROM coffees", (err, rows) => {
    res.json(rows);
  });
});

app.post("/vote/:id", (req, res) => {
  db.run(
    "UPDATE coffees SET votes = votes + 1 WHERE id = ?",
    [req.params.id],
    () => {
      res.json({ message: "Vote Added" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});