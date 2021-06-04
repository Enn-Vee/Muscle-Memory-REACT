/**
 * Validates whether the input by the user conforms to the given schema.
 * @param {Object} schema - Yup validation schema containing the constraints of the form.
 * @returns 
 */
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    }
    catch (error) {
        res.status(400).json(error)
    }
}

module.exports = validate;