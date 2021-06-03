/* Checks whether or not the user is currently logged in */
const authenticate = (passport) => async (req, res, next) => {
    if(req.isAuthenticated())
        return next();
    else 
        res.status(401).send('not logged in')
}

module.exports = authenticate;