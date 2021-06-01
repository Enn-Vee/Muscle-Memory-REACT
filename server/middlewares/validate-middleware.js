const validate = (schema) => async (req, res, next) => {
    const body = req.body;
    try {
        await schema.validate(req.body);
        return next();
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = validate;