/* DEPENDENCIES */
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const express = require('express');
const mysql = require('mysql')
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const passport = require('passport')
const expressSession = require('express-session')


/* MIDDLEWARE */
const app = express();


/* ROUTES */

/* SERVER START*/
app.listen(process.env.PORT || 4000, (err) =>{
    if(err)
        console.log(err);
    else 
        console.log('Server running on port ' + process.env.PORT+'...')
})
