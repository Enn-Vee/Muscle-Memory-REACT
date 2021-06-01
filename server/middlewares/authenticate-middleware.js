const authenticate = (passport) => async (req, res, next) => {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated())
        return next();
    else 
        res.status(401).send('not logged in')
}

module.exports = authenticate;