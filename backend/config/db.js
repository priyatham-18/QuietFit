require('dotenv').config();
console.log('DB.JS LOADED: SQLite version');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path (in project root)
const dbPath = path.resolve(__dirname, '..', 'quietfit.db');
const sqliteDb = new sqlite3.Database(dbPath);

// Wrapper to mimic mysql2 pool promise interface
const pool = {
  promise: () => ({
    query: (sql, params = []) => {
      console.log('DB.JS QUERY CALLED:', sql);
      return new Promise((resolve, reject) => {
        // Determine if it's a SELECT query (returns rows) or otherwise
        const isSelect = /^\s*select/i.test(sql);
        if (isSelect) {
          sqliteDb.all(sql, params, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              // mysql2 returns [rows, fields]; we mimic with rows and empty fields array
              resolve([rows, []]);
            }
          });
        } else {
          sqliteDb.run(sql, params, function(err) {
            if (err) {
              reject(err);
            } else {
              // For INSERT/UPDATE/DELETE, return info about changes
              // mysql2: [{"affectedRows": 1, "insertId": 1, ...}, []]
              const result = {
                changedRows: this.changes,
                insertId: this.lastID
              };
              resolve([result, []]);
            }
          });
        }
      });
    }
  })
};

// Initialize database tables
async function initializeTables() {
  console.log('INITIALIZING TABLES');
  const tables = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'member',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Workouts table
    `CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      difficulty TEXT,
      duration_minutes INTEGER,
      calories_burned INTEGER
    )`,

    // Progress table
    `CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER NOT NULL,
      weight REAL,
      body_fat REAL,
      bmi REAL,
      waist_cm REAL,
      chest_cm REAL,
      workout_score INTEGER,
      recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (member_id) REFERENCES users(id)
    )`,

    // Diet plans table
    `CREATE TABLE IF NOT EXISTS diet_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER NOT NULL,
      plan_name TEXT,
      daily_calories INTEGER,
      protein_grams INTEGER,
      carbs_grams INTEGER,
      fats_grams INTEGER,
      dietary_preference TEXT,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (member_id) REFERENCES users(id)
    )`,

    // Gym capacity table (for attendance)
    `CREATE TABLE IF NOT EXISTS gym_capacity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      max_capacity INTEGER NOT NULL DEFAULT 100,
      current_occupancy INTEGER DEFAULT 0
    )`,

    // Attendance table
    `CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      check_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      check_out TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,

    // Memberships table
    `CREATE TABLE IF NOT EXISTS memberships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      membership_type TEXT,
      start_date DATE,
      end_date DATE,
      status TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,

    // Trainer availability table
    `CREATE TABLE IF NOT EXISTS trainer_availability (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      trainer_id INTEGER NOT NULL,
      day_of_week TEXT NOT NULL, -- e.g., 'Monday'
      start_time TEXT NOT NULL, -- HH:MM format
      end_time TEXT NOT NULL, -- HH:MM format
      status TEXT DEFAULT 'active',
      FOREIGN KEY (trainer_id) REFERENCES users(id)
    )`,

    // Workout templates table
    `CREATE TABLE IF NOT EXISTS workout_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      trainer_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      exercises TEXT, -- JSON string of exercises
      is_public BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (trainer_id) REFERENCES users(id)
    )`
  ];

  for (const sql of tables) {
    await pool.promise().query(sql);
  }

  // Insert initial gym capacity if not exists
  const [row] = await pool.promise().query(`SELECT COUNT(*) AS count FROM gym_capacity`);
  if (row[0].count === 0) {
    await pool.promise().query(`INSERT INTO gym_capacity (max_capacity) VALUES (100)`);
  }
  console.log('TABLES INITIALIZED');
}

// Open the database and initialize tables
sqliteDb.on('open', () => {
  console.log('Connected to SQLite database.');
  initializeTables()
    .then(() => {
      console.log('Database tables initialized.');
    })
    .catch(err => {
      console.error('Error initializing tables:', err);
    });
});

sqliteDb.on('error', (err) => {
  console.error('SQLite database error:', err);
});

module.exports = pool;