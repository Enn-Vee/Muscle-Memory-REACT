const User = require('../models/user-model.js');
const mysql = require("mysql");
const utils = require("../utils/utils.js");

/**
 * Calls the getByID method of the exercise model which gets an exercise by its ID.
 * @param {express.Request} req - Must have username, email, and password in its body.
 * @param {express.Response} res 
 */
exports.register = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    User.register(user, (error, data) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.status(200).send('registered!');
    })
}

/**
 * Logs the user out. Invalidates the session ID.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.logOut = (req, res) => {
    req.logOut();
    res.send('logged out');
}

/**
 * Confirms that the middleware that authenticates the user has succeeded.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.logIn = (req, res) => {
    res.send('logged in');
}

/**
 * Calls the getAll method of the user model which gets the information of all users in the database.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getAll = (req, res) => {
    User.getAll((error,result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send(result);
    })
}

/**
 * Calls the getAllLikedExercises method of the user model which gets the information of all exercises that the user has liked.
 * @param {express.Request} req - Must contain a username in the URI parameter.
 * @param {express.Response} res 
 */
exports.getAllLikedExercises = (req, res) => {
    let username = req.params.username;
    /* SORTING */
    let sortOption = utils.getSortOptions(req.query);
    /* Filtering using query parameters */
    let filters = utils.getFilters(req.query);
    /* Pagination */
    let pagination = utils.getPage(req.query);
    
    User.getAllLikedExercises(username, sortOption, filters, pagination, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            })
        else if(result.length > 0)
            res.send(result);
        else 
            res.send('User has not liked any exercises.')
    })
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getOneLikedExercise = (req, res) => {
    let username = req.params.username
    let exerciseId = req.params.exerciseId
    User.getOneLikedExercise(username, exerciseId, (error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            })
        else if(result.length > 0)
            res.send(true);
        else 
            res.send(false)
    })
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getByUsername = (req, res) => {
    const username = req.params.username
    User.getByUsername(username,(error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send(result);
    })
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getByEmail = (req, res) => {
    const email= req.params.email
    User.getByEmail(email,(error, result) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else
            res.send(result);
    })
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getCurrentUser = (req, res) => {
    if(req.user)
        res.send(req.user);
    else    
        res.send(null);
}