const Exercise = require('../models/exercise-model.js')

/* Get an exercise by its id */
exports.getByID = (req, res) => {
    Exercise.getByID(req.title, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send(result);
    })
}

/* Creates a new exercise in the database */
exports.createExercise = (req, res) => {
    const newExercise = req.body;
    newExercise.author_id = req.user.user_id;
    const exercise = new Exercise(newExercise)
    Exercise.createExercise(exercise, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.status(200).send('created new exercise!')
    })
}

/* Fetches all exercises currently in the database */
exports.getAll = (req, res) => {
    Exercise.getAll((error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send(result);
    })
}

exports.getByUser = (req, res) => {
    const username = req.params.username;
    Exercise.getByUser(username, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send(result);
    })
}

exports.getByTitle = (req, res) => {
    const title = req.params.title;
    Exercise.getByTitle(title, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send(result)
    })
}

/* Increments the "likes" column of the given exercise id. */
exports.like = (req, res) => {
    let exerciseId = req.params.id;
    let userId = req.user.user_id;
    Exercise.like(exerciseId, userId, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else {
            res.send(true);
        }
    })
}

/* Decrements the "likes" column of the given exercise id. */
exports.unlike = (req, res) => {
    let exerciseId = req.params.id;
    let userId = req.user.user_id;
    Exercise.unlike(exerciseId, userId, (error, result) => {
        if(error)
            res.status(500).send('already liked',{
                message: error.message
            });
            else {
                res.send(false);
            }
    })
}