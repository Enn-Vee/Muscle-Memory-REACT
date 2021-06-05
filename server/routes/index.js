const validate = require('../middlewares/validate-middleware').body
const registrationSchema = require('../validations/registration-schema')

/* MODELS*/
const users = require("../controllers/user-controller.js");

/* ROUTES */
module.exports = passport => {
    const express = require('express');
    const router = express.Router();

    router.use('/users', require('./user-routes.js')(passport));
    router.use('/exercises', require('./exercise-routes.js')(passport));
    router.post('/register', validate(registrationSchema), users.register)
    router.post('/login', passport.authenticate('local'), users.logIn)
    router.post('/logout', users.logOut);
    router.get('/currentUser' , users.getCurrentUser)

    return router
};