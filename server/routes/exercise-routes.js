const validate = require('../middlewares/validate-middleware')
const exerciseSchema = require('../validations/exercise-schema.js')
const exercises = require("../controllers/exercise-controller.js");

module.exports = passport => {
    const express = require('express');
    const router = express.Router();

    router.get('/', exercises.getAll);
    router.post('/', validate(exerciseSchema), exercises.createExercise)
    return router;
}