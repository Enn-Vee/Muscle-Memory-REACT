const utils = require('../utils/utils.js');

/**
 * Validates whether the input by the user conforms to the given schema.
 * @param {Object} schema - Yup validation schema containing the constraints of the form.
 * @returns 
 */
exports.body = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    }
    catch (error) {
        res.status(400).json(error)
    }
};

/**
 * Validates whether the parameters given by the user conforms to the given schema.
 * @param {Object} schema - Yup validation schema containing the constraints
 * @returns 
 */
exports.query = (schema) => async (req, res, next) => {
    try {
        req.query.target_muscle = utils.parseStringToArray(req.query.target_muscle);
        await schema.validate(req.query);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};