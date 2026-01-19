const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// CREATE entry
app.post('/wardens', (req, res) => {
  const { staffNumber, firstName, lastName, location } = req.body;
  const timestamp = new Date().toISOString();

  db.run(
    `INSERT INTO wardens (staffNumber, firstName, lastName, location, timestamp)
     VALUES (?, ?, ?, ?, ?)`,
    [staffNumber, firstName, lastName, location, timestamp],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// READ all entries
app.get('/wardens', (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM wardens`, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
}); // ✅ This closing brace was missing

// UPDATE entry
app.put('/wardens/:id', (req, res) => {
  const { staffNumber, firstName, lastName, location } = req.body;

  db.run(
    `UPDATE wardens SET staffNumber=?, firstName=?, lastName=?, location=? WHERE id=?`,
    [staffNumber, firstName, lastName, location, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE entry
app.delete('/wardens/:id', (req, res) => {
  db.run(
    `DELETE FROM wardens WHERE id=?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
});

app.listen(4000, () => console.log('Server running on port 4000'));
