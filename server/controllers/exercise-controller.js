const Exercise = require('../models/exercise-model.js')

/**
 * Calls the getByID method of the exercise model which gets an exercise by its ID.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
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

/**
 * Calls the createExercise method of the exercise model which inserts a new exercise into the database.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
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

/**
 * Calls the getAll method of the exercise model which fetches all the exercises in the database.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
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

/**
 * Calls the getByUser method of the exercise model which fetches all the exercises in the database that are submitted by the user in the URI parameter.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
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

/**
 * Calls the getByTitle method of the exercise model which fetches the details of the exercise with the given title in the URI parameter.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
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

/**
 * Calls the like method of the exercise model which inserts the user ID and the exercise ID into the exercise_likes table in the database
 * and increments the like count of the exercise.
 * @param {express.Request} req 
 * @param {express.Response} res  
 */
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

/**
 * Calls the unlike method of the exercise model which deletes the entry with the given user ID and exercise ID in the exercise_likes table
 * and decrements the like count of the exercise.
 * @param {express.Request} req 
 * @param {express.Response} res  
 */
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