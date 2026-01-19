const sqlite3 = require('sqlite3').verbose();

// Create and open the database
const db = new sqlite3.Database('./firewardens.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS wardens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      staffNumber TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      location TEXT NOT NULL,
      timestamp TEXT NOT NULL
    )
  `);
});

module.exports = db;
