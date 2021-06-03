const db = require('./database.js')
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
}

User.register = async (newUser, result) => {
    let username = newUser.username;
    let email =  newUser.email;
    await bcrypt.hash(newUser.password, SALT_ROUNDS, (error, hash) => {
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

User.getAllLikedExercises = (username, result) => {
    db.query('SELECT title,\
        target_muscle,\
        sets,\
        reps,\
        duration,\
        video_id,\
        liked_at\
    FROM exercise_likes\
    JOIN exercise\
        ON exercise_likes.exercise_id = exercise.exercise_id\
    JOIN users\
        ON exercise_likes.user_id = users.user_id\
    WHERE username=?', username, (error, res) => {
        if(error) {
            console.log("error: ", error)
            result(error, null);
            return;
        }
        result(null, res);
    })
}

User.getOneLikedExercise = (username, exerciseId, result) => {
    db.query('SELECT title,\
        target_muscle,\
        sets,\
        reps,\
        duration,\
        video_id,\
        liked_at\
    FROM exercise_likes\
    JOIN exercise\
        ON exercise_likes.exercise_id = exercise.exercise_id\
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