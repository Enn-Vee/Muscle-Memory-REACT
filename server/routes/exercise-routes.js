const validate = require('../middlewares/validate-middleware.js')
const authenticate = require('../middlewares/authenticate-middleware.js')
const exerciseSchema = require('../validations/exercise-schema.js')
const exercises = require("../controllers/exercise-controller.js");

module.exports = passport => {
    const express = require('express');
    const router = express.Router();

    router.get('/', exercises.getAll);
    router.post('/', validate(exerciseSchema), exercises.createExercise)
    router.patch('/:id/like', authenticate(passport), exercises.like)
    router.patch('/:id/unlike', authenticate(passport), exercises.unlike)
    return router;
}