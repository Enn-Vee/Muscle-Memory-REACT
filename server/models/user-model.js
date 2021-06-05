const db = require('./database.js')
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

/**
 * User Constructor
 * @param {Object} user 
 */
const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
}

/**
 * Registers a new user into the database.
 * @param {User} newUser 
 * @param {Function} result 
 */
User.register = async (newUser, result) => {
    let username = newUser.username;
    let email =  newUser.email;
    await bcrypt.hash(newUser.password, SALT_ROUNDS, (error, hash) => { //Hash passwords before storing into database.
        newUser.password = hash;
        db.query('INSERT INTO users (username, email, password) VALUES(?,?,?)', [username, email, hash], (error, res) => {
            if(error) {
                console.log("error: ", error)
                result(error, null);
                return;
            }
            result(null, {id: res.insertId, ... newUser})
        })
    })
}

/**
 * Gets all users in the database.
 * @param {Function} result 
 */
User.getAll = result => {
    db.query("SELECT id, username, email FROM users", (error, res) => {
        if(error) {
            console.log("error: ", error)
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Checks if username is taken.
 * @param {String} username 
 * @param {Function} result 
 */
User.getByUsername = (username, result) => {
    db.query("SELECT username FROM users WHERE username=?", [username], (error, res) => {
        if(error) {
            console.log("error: ", error)
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Checks if email is taken.
 * @param {String} email 
 * @param {Function} result 
 */
User.getByEmail = (email, result) => {
    db.query("SELECT email FROM users WHERE email=?", [email], (error, res) => {
        if(error) {
            console.log("error: ", error)
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Gets details of the user with the given ID.
 * @param {Number} id 
 * @param {Function} result 
 */
User.findByID = (id , result) => {
    db.query('SELECT id, username, email FROM users WHERE id=?', id, (error, res) => {
        if(error) {
            console.log("error: ", error)
            result(error, null);
            return;
        }
        result(null, res);
    })
} 

/**
 * Gets all the exercises that a user of the given username liked.
 * @param {String} username 
 * @param {Function} result 
 */
 User.getAllLikedExercises = (username, filters, pagination, result) => {
    let query = "SELECT title,\
        target_muscle,\
        sets,\
        reps,\
        duration,\
        video_id,\
        liked_at\
    FROM exercise_likes\
    JOIN exercises\
        ON exercise_likes.exercise_id = exercises.exercise_id\
    JOIN users\
        ON exercise_likes.user_id = users.user_id\
    WHERE username=?";
    query += filters; //Query parameters
    query += pagination; //Pagination
    db.query(query, username, (error, res) => {
        if(error) {
            console.log("error: ", error)
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Checks if a user has liked a specific exercise.
 * @param {String} username 
 * @param {Number} exerciseId 
 * @param {Function} result 
 */
User.getOneLikedExercise = (username, exerciseId, result) => {
    db.query('SELECT title,\
        target_muscle,\
        sets,\
        reps,\
        duration,\
        video_id,\
        liked_at\
    FROM exercise_likes\
    JOIN exercises\
        ON exercise_likes.exercise_id = exercises.exercise_id\
    JOIN users\
        ON exercise_likes.user_id = users.user_id\
    WHERE username=? AND exercise_likes.exercise_id=?', [username,exerciseId], (error, res) => {
        if(error) {
            console.log("error: ", error)
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Removes user from the database.
 * @param {Number} id 
 * @param {Function} result 
 */
User.remove = (id, result) => {
    db.query("DELETE FROM users WHERE id=?", id, (error, result) => {
        if(error) {
            console.log("error: ", error)
            result(error, null);
            return;
        }
        result(null, res);
    })
}

module.exports = User;