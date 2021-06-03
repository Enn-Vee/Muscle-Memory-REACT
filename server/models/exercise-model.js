const db = require('./database.js')
const utils = require('../utils/utils.js')

/* EXERCISE CONSTRUCTOR */
const Exercise = function(exercise) {
    this.author_id = exercise.author_id;
    this.title = exercise.title;
    this.target_muscle = exercise.target_muscle;
    this.description = exercise.description;
    this.sets = exercise.sets;
    this.reps = exercise.reps;
    this.duration = exercise.duration;
    this.video_id = utils.getVideoID(exercise.video_url); //Parses the URL for the youtube video ID.
}

/* Add new exercise to the database */
Exercise.createExercise = (newExercise, result) => {
    db.query('INSERT INTO exercise (author_id, title, target_muscle, description, sets, reps, duration, video_id) VALUES(?,?,?,?,?,?,?,?)',
    [newExercise.author_id, newExercise.title, newExercise.target_muscle, newExercise.description, newExercise.sets, newExercise.reps, newExercise.duration, newExercise.video_id],
    (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, {id: res.insertId, ...newExercise});
    })
}

/* Retrieve all exercises */
Exercise.getAll = (result) => {
    db.query('SELECT\
    exercise_id,\
    username AS author,\
    title, target_muscle,\
    sets, reps, duration,\
    likes,\
    video_id\
    FROM exercise\
    JOIN users ON exercise.author_id = users.user_id', (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/* Find an exercise by its name */
Exercise.getByTitle = (title, result) => {
    db.query('SELECT * FROM exercise WHERE title=?', title, (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

Exercise.getByUser = (username, result) => {
    db.query('SELECT\
    exercise_id,\
    username AS author,\
    title, target_muscle,\
    sets, reps, duration,\
    likes,\
    video_id\
    FROM exercise\
    JOIN users ON exercise.author_id = users.user_id\
    WHERE username=?', [username], (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/* Increments the "likes" column of the specificied exercise by one and adds which userId liked what exerciseId in the database*/
Exercise.like = (exerciseId, userId, result) => {
    db.query('UPDATE exercise\
    SET likes = likes + 1\
    WHERE exercise_id=?;\
    INSERT INTO exercise_likes (user_id, exercise_id) VALUES(?,?)', [userId, userId, exerciseId], (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

/* Decrements the "likes" column of the specificied exercise by one and removes which userId liked what exerciseId in the database */
Exercise.unlike = (exerciseId, userId, result) => {
    db.query('UPDATE exercise\
    SET likes = likes - 1\
    WHERE exercise_id=?;\
    DELETE FROM exercise_likes WHERE user_id=? AND exercise_id=?', [userId, userId, exerciseId], (error, res) => {
        if(error) {
            console.log(error);
            result(error, null);
            return;
        }
        result(null, res);
    })
}

module.exports= Exercise;