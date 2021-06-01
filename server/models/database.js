const mysql = require('mysql');
const dotenv = require('dotenv');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
})

db.connect(error => {
    if(error)
        throw error;
    console.log('Connected to the database...')
})

module.exports = db