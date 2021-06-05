const validate = require('../middlewares/validate-middleware.js')
const registrationSchema = require('../validations/registration-schema')
const exerciseSchema = require('../validations/exercise-schema')
const checkUserExistence = require('../middlewares/checkUserExistence-middleware.js')
const users = require("../controllers/user-controller.js");

/* User route */
module.exports = passport => {
    const express = require('express');
    const router = express.Router();

    router.get('/', users.getAll)
    router.get('/:username/liked/', checkUserExistence(), validate.query(exerciseSchema.exerciseParameterSchema),users.getAllLikedExercises)
    router.get('/:username/liked/:exerciseId', checkUserExistence(), users.getOneLikedExercise)
    router.get('/check/:username', users.getByUsername)
    router.get('/check/:email', users.getByEmail)
    router.post('/', validate.body(registrationSchema), users.register)
    router.get('/currentUser', users.getCurrentUser)

    return router;
}