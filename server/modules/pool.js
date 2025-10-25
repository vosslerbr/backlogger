// Connects db to project
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

//env
console.log('Environment variables loaded:', {
    SQL_USER: process.env.SQL_USER,
    SQL_PASS: process.env.SQL_PASS,
    ENV_FILE_PATH: process.env.NODE_ENV,
    CWD: process.cwd()
});

const user = process.env.SQL_USER;
const pass = process.env.SQL_PASS;
console.log(pass);

let pool;

if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is
// also running on our computer (localhost)
//posgres port 5432
else {
  pool = new pg.Pool({
    user: user,
    password: pass,
    host: 'localhost',
    port: 5432,
    database: 'backlogger',
  });
}

export default pool;
