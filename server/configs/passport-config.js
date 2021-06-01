const passport = require('passport')
const LocalStrat = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../models/database')

passport.use(new LocalStrat((username,password, done) => {
    db.query('SELECT * from users WHERE username=?',[username], async (error, results, fields) => { //Find the user trying to log in
        if(error)
            done(error);
        if(results.length === 0){
            return done(null, false);
        }
        try {
            await bcrypt.compare(password, results[0].password, (err, check) => {//compare passwords.
                if(err)
                    done(err);
                if(check)  {
                    delete results[0].password;
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

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => { 
    db.query('SELECT * FROM users WHERE id=?', [id], (error, result, field) => {
        if(error)
            done(error);
        if(result.length > 0) {
            delete result[0].password;
            delete result[0].datetime_created;
            done(null, result[0]);
        }
    })
})

module.export = passport;

/*function initialize(passport) {
    passport.use(new localStrat((username,password, done) => {
        db.query('SELECT * from users WHERE username=?',[username], async (error, results, fields) => { //Find the user trying to log in
            if(error)
                done(error);
            if(results.length === 0){
                return done(null, false);
            }
            try {
                await bcrypt.compare(password, results[0].password, (err, check) => {//Compare the passwords.
                    if(err)
                        done(err);
                    if(check)  {
                        delete results[0].password; //Makes sure that the hash is unexposed.
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

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) => { 
        db.query('SELECT id, username, email FROM users WHERE id=?', [id], (error, result, field) => {
            if(error)
                done(error);
            if(result.length > 0) {
                done(null, result[0]);
            }
        })
    })
}*/