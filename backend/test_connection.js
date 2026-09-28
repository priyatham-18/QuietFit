const mysql = require('mysql2');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

console.log('Attempting to connect with config:', config);

const db = mysql.createPool(config);

db.getConnection((err, connection) => {
  if (err) {
    console.error('Connection failed:', err.code, err.message);
  } else {
    console.log('Connected successfully!');
    connection.release();
  }
});

