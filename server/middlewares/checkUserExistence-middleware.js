const db = require('../models/database.js')

/* Checks whether the user input conforms to the respective schema */
const checkUserExistence = () => async (req, res, next) => {
    let username = req.params.username
    db.query('SELECT username FROM users WHERE username=?', [username], (error, results) => {
        if(error)
            res.status(500).send({
                message: error.message
            });
        else if(results.length > 0)
            next();
        else
            res.status(404).send('User not found')
    })
}

module.exports = checkUserExistence;