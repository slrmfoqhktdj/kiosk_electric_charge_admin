const mysql = require('mysql2');
// require('dotenv').config({ path:path.join(__dirname,'./.env') });

// const DB_HOST = process.env.DATABASE_HOST
// const DB_PORT = process.env.DATABASE_PORT
// const DB_USER = process.env.DATABASE_USER
// const DB_PASSWORD = process.env.DATABASE_PASSWORD
// const DB_NAME = process.env.DATABASE_NAME
const option = require('./dboption')

// console.log(option.DB_HOST)
// console.log(option.DB_PORT)
// console.log(option.DB_USER)
// console.log(option.DB_PASSWORD)
// console.log(option.DB_NAME)

const db = mysql.createConnection({
    host:option.DB_HOST,
    port:option.DB_PORT,
    user:option.DB_USER,
    password:option.DB_PASSWORD,
    database:option.DB_NAME,
});
db.connect();

module.exports = db;