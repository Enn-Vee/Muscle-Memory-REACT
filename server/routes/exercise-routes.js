const validate = require('../middlewares/validate-middleware.js')
const authenticate = require('../middlewares/authenticate-middleware.js')
const exerciseSchema = require('../validations/exercise-schema.js')
const exercises = require("../controllers/exercise-controller.js");

/* Exercise routes */
module.exports = passport => {
    const express = require('express');
    const router = express.Router();

    router.get('/', validate.query(exerciseSchema.exerciseParameterSchema), exercises.getAll);
    router.get('/:id/likes', exercises.getNumLikes)
    router.post('/', validate.body(exerciseSchema.exerciseSchema), exercises.createExercise)
    router.get('/user/:username', exercises.getByUser)
    router.get('/:title', exercises.getByTitle)
    router.post('/:id/like', authenticate(passport), exercises.like)
    router.delete('/:id/unlike', authenticate(passport), exercises.unlike)

    return router;
}