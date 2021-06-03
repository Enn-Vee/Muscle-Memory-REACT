const User = require('../models/user-model.js')

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

exports.logOut = (req, res) => {
    req.logOut();
    res.send('logged out');
}

exports.logIn = (req, res) => {
    res.send('logged in');
}

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

/* Sends a list of all exercises a user has liked.*/
exports.getAllLikedExercises = (req, res) => {
    let username = req.params.username
    User.getAllLikedExercises(username, (error, result) => {
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

/* Checks if user has liked a specific exercise. Sends exercise details if liked. Otherwise, sends false.*/
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

exports.getCurrentUser = (req, res) => {
    if(req.user)
        res.send(req.user);
    else    
        res.send(null);
}