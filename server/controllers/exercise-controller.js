const Exercise = require('../models/exercise-model.js')

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

exports.createExercise = (req, res) => {
    const exercise = new Exercise(req.body)
    Exercise.createExercise(exercise, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.status(200).send('created new exercise!')
    })
}

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

exports.like = (req, res) => {
    Exercise.like(req.params.id, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send('liked!');
    })
}

exports.unlike = (req, res) => {
    Exercise.unlike(req.params.id, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send('unliked!');
    })
}