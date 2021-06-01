
/* MODELS*/
const users = require("../controllers/user-controller.js");
const exercises = require("../controllers/exercise-controller.js")

/* ROUTES */
module.exports = passport => {
    const express = require('express');
    const router = express.Router();

    router.use('/users', require('./user-routes.js')(passport));
    router.use('/exercises', require('./exercise-routes.js')(passport));
    router.post('/logout', users.logOut);
    router.get('/currentUser' , users.getCurrentUser)

    return router
};