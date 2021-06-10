const db = require('./database.js');
const utils = require('../utils/utils.js');

/**
 * Constructs a class Exercise using the given JavaScript Object.
 * @param {Object} exercise - Exercise Constructor 
 */
const Exercise = function(exercise) {
    this.author_id = exercise.author_id;
    this.title = utils.capitalizeFirstChar(exercise.title);
    this.target_muscle = exercise.target_muscle;
    this.description = exercise.description;
    this.sets = exercise.sets;
    this.reps = exercise.reps;
    this.duration = exercise.duration;
    this.video_id = utils.getVideoID(exercise.video_url); //Parses the URL for the youtube video ID.
    this.difficulty = utils.capitalizeFirstChar(exercise.difficulty);
}

/**
 * Inserts an exercise into the MySQL database.
 * @param {Exercise} newExercise - Exercise to insert.
 * @param {Function} result
 */
Exercise.createExercise = (newExercise, result) => {
    db.query(`INSERT INTO exercises (author_id, title, target_muscle, description, sets, reps, duration, video_id, difficulty) VALUES(?,?,?,?,?,?,?,?,?)`,
    [newExercise.author_id, newExercise.title, newExercise.target_muscle, newExercise.description, newExercise.sets, newExercise.reps, newExercise.duration, newExercise.video_id, newExercise.difficulty],
    (error, res) => {
        if(error) {
            console.log(error)
            result(error, null);
            return;
        }
        result(null, {id: res.insertId, ...newExercise});
    })
}

/**
 * Gets all exercises of the given options.
 * @param {String} sortOption 
 * @param {String} filters 
 * @param {String} pagination 
 * @param {Function} result 
 */
Exercise.getAll = (sortOption, filters, pagination, result) => {
    let query = "SELECT\
    users.username as author,\
    title, target_muscle,\
    difficulty,\
    exercises.created_at,\
    description,\
    exercises.exercise_id,\
    sets, reps, duration,\
    count(exercise_likes.exercise_id) as likes,\
    video_id\
    FROM exercise_likes\
    RIGHT JOIN exercises ON exercise_likes.exercise_id = exercises.exercise_id\
    JOIN users ON exercises.author_id = users.user_id WHERE 1=1"
    query += filters; //Filtering
    query += " GROUP BY exercises.exercise_id";
    query += sortOption; //Sorting
    query += pagination; //Pagination
    db.query(query, (error, res) => {
        if(error) {
            console.log(error);
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Finds the exercise of the given title
 * @param {String} title - Name of the exercise to find.
 * @param {Function} result
 */
Exercise.getByTitle = (title, result) => {
    db.query('SELECT * FROM exercises WHERE title=?', title, (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Gets all exercises submitted by a user.
 * @param {String} username - Username to find exercises for
 * @param {Function} result
 */
Exercise.getByUser = (username, result) => {
    db.query('SELECT\
    exercise_id,\
    username AS author,\
    title, target_muscle,\
    sets, reps, duration,\
    likes,\
    video_id\
    FROM exercises\
    JOIN users ON exercises.author_id = users.user_id\
    WHERE username=?', [username], (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Likes an exercise
 * @param {Number} exerciseId - ID of the exercise the user has liked.
 * @param {Number} userId - ID of the user that liked the exercise.
 * @param {Function} result
 */
Exercise.like = (exerciseId, userId, result) => {
    db.query("INSERT INTO exercise_likes (user_id, exercise_id) VALUES(?,?)", [userId, exerciseId], (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Unlikes an exercise.
 * @param {Number} exerciseId - ID of the exercise the user unliked.
 * @param {Number} userId - ID of the user that unliked the exercise.
 * @param {Function} result 
 */
Exercise.unlike = (exerciseId, userId, result) => {
    db.query('DELETE FROM exercise_likes WHERE user_id=? AND exercise_id=?', [userId, exerciseId], (error, res) => {
        if(error) {
            console.log(error);
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Gets the number of likes from an exercise.
 * @param {Number} exerciseId 
 * @param {Function} result 
 */
Exercise.getNumLikes = (exerciseId, result) => {
    db.query('SELECT count(*) as likes FROM exercise_likes WHERE exercise_id=?', exerciseId, (error, res) => {
        if(error) {
            console.log(error);
            result(error, null);
            return;
        }
        result(null, res);
    })
} 
module.exports= Exercise;