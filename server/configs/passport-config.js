const passport = require('passport')
const LocalStrat = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../models/database')

/* Defines the users are authenticated using a local strategy. */
passport.use(new LocalStrat((username,password, done) => {
    db.query('SELECT * from users WHERE username=?',[username], async (error, results, fields) => { //Find the user trying to log in
        if(error)
            done(error);
        if(results.length === 0){
            return done(null, false); //User not found.
        }
        try {
            await bcrypt.compare(password, results[0].password, (err, check) => {//Compare passwords.
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

/* Serializes user to a session */
passport.serializeUser((user, done) => {
    done(null, user.user_id);
})

/* Finds user with the given ID. Stores it to req.user */
passport.deserializeUser((userId, done) => { 
    db.query('SELECT * FROM users WHERE user_id=?', [userId], (error, result, field) => {
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