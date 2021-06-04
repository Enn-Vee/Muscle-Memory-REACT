/**
 * 
 * @param {Object} passport 
 * @returns 
 */
const authenticate = (passport) => async (req, res, next) => {
    if(req.isAuthenticated())
        next();
    else 
        res.status(401).send('not logged in')
}

module.exports = authenticate;