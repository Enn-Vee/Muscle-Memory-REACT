/* DEPENDENCIES */
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

/* MIDDLEWARE */
require('./configs/passport-config.js');
const app = express();

const whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000']
app.use(cors({
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000*60*60*24 //Cookie lasts for 1 day.
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/")(passport));

/* SERVER START*/
app.listen(process.env.PORT || 4000, (err) =>{
    if(err)
        console.log(err);
    else 
        console.log('Server running on port ' + process.env.PORT+'...')
})
