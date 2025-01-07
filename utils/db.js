import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'baltimore',
  database: 'baltimore_foodline',
});

export default db;
