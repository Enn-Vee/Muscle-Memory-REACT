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

exports.getCurrentUser = (req, res) => {
    if(req.user)
        res.send(req.user);
    else    
        res.send(null);
}