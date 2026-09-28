const db = require('./config/db');

db.promise().query("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
  .then(([rows]) => {
    console.log('Tables:');
    rows.forEach(row => {
      console.log('-', row.name);
    });
  })
  .catch(err => {
    console.error('Error:', err);
  });
