const db = require('./database.js')
const utils = require('../utils/utils.js')

const Exercise = function(exercise) {
    this.author = exercise.author;
    this.title = exercise.title;
    this.target_muscle = exercise.target_muscle;
    this.description = exercise.description;
    this.sets = exercise.sets;
    this.reps = exercise.reps;
    this.duration = exercise.duration;
    this.video_url = utils.getVideoID(exercise.video_url);
}

Exercise.createExercise = (newExercise, result) => {
    db.query('INSERT INTO exercise (author, title, target_muscle, description, sets, reps, duration, video_url) VALUES(?,?,?,?,?,?,?,?)',
    [newExercise.author, newExercise.title, newExercise.target_muscle, newExercise.description, newExercise.sets, newExercise.reps, newExercise.duration, newExercise.video_url],
    (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, {id: res.insertId, ...newExercise});
    })
}

Exercise.getByTitle = (title, result) => {
    db.query('SELECT * FROM exercise WHERE title=?', title, (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

Exercise.getAll = (result) => {
    db.query('SELECT * FROM exercise', (error, res) => {
        if(error) {
            result(error, null);
            return;
        }
        result(null, res);
    })
}

module.exports= Exercise;