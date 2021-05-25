/* DEPENDENCIES */
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const passport = require('passport');
const localStrat = require('passport-local').Strategy;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser')




/* MIDDLEWARE */
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000*60*60*24
    }
}))

passport.use(new localStrat((username,password, done) => {
    db.query('SELECT * from users WHERE username=?',[username], async (error, results, fields) => {
        if(error)
            done(error);
        if(results.length === 0){
            return done(null, false);
        }
        try {
            await bcrypt.compare(password, results[0].password, (err, check) => {
                if(err)
                    done(err);
                if(check)  {
                    return done(null, results[0]);
                }
                return done(null, false);
            })
        }
        catch(e) {
            console.log(e);
        }
    })
}))

app.use(passport.initialize());
app.use(passport.session());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_SECRET,
    database: process.env.DB
})
db.connect();

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => { 
    db.query('SELECT * FROM users WHERE id=?', [id], (error, result, field) => {
        if(error)
            done(error);
        if(result.length > 0)
            done(null, result[0]);
    })
})

/* ROUTES */

app.post('/register', async (req, res) => {
    try{
        let username = req.body.username;
        await bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
            db.query('SELECT * FROM users WHERE username=?',[username], (error, results, field) => {
                if(error) 
                    throw error;
                if(results.length > 0)
                    res.send('taken')
                else {
                    db.query('INSERT INTO users (username, password) VALUES(?,?)', [username,hash], (e, r, f) => {
                        if(e)
                            throw e;
                        res.send('success');
                    })
                }
            })
        });      
    }
    catch(e) {
        console.log(e);
    }
})

app.get('/logout', async (req,res) => {
    req.logOut();
    res.send('logged out');
})

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
})

app.get('/user', (req, res) => {
    if(req.user)
        res.send(req.user);
    else 
        res.send(null);
})

/* SERVER START*/
app.listen(process.env.PORT || 4000, (err) =>{
    if(err)
        console.log(err);
    else 
        console.log('Server running on port ' + process.env.PORT+'...')
})
