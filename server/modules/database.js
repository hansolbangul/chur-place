import { createPool } from 'mysql2/promise';
var pool = null;

export default function () {
  pool = createPool({
    host: process.env.HOSTNAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 20,
  });
  return pool;
}
