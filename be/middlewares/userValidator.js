const { body, validationResult} = require('express-validator');

const userBodyParams = [
    body('name')
        .notEmpty()
        .isString()
        .withMessage('Name is required'),

    body('surname')
        .notEmpty()
        .isString()
        .withMessage('Surname is required'),
    
    body('age')
        .notEmpty()
        .isInt()
        .withMessage('Age is required and must be a number'),

    body('email')
        .notEmpty()
        .isString()
        .withMessage('Email is required and must be unique'),

    body('password')
        .notEmpty()
        .isString()
        .withMessage('Password is required'),

    body('nickname')
        .notEmpty()
        .isString()
        .withMessage('Nickname is required'),
];

const validateUserBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });    
    }
    next();
};

module.exports = { userBodyParams, validateUserBody };