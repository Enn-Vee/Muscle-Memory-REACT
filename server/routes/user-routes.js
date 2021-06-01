const validate = require('../middlewares/validate-middleware')
const registrationSchema = require('../validations/registration-schema')
const users = require("../controllers/user-controller.js");

module.exports = passport => {
    const express = require('express');
    const router = express.Router();

    router.get('/', users.getAll)
    router.post('/login', passport.authenticate('local'), users.logIn)
    router.post('/logout', users.logOut)
    router.post('/', validate(registrationSchema), users.register)
    router.get('/currentUser', users.getCurrentUser)

    return router;
}

/*(app, express, passport) => {
    const users = require("../controllers/users-controller.js");
    onst router = express.Router();
    app.route('/users')
    .get()
    .post()
    .put()
    .patch()
    .delete()

    router.post('/register', validate(validationSchemas.registrationSchema), users.registerUser)
    router.post('/login', passport.authenticate('local'), users.logIn)
    router.get('/user',users.getCurrentUser) //Check if a user is logged in
}*/