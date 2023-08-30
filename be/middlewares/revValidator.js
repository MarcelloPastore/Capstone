const { body, validationResult } = require('express-validator');

const revBodyParams = [
    body('title')
        .notEmpty()
        .isString()
        .withMessage('Title is required'),

    body('description')
        .notEmpty()
        .isString()
        .isLength({ min: 15 })
        .withMessage('Description is required and must be at least 15 characters'),

    body('nickname')
        .notEmpty()
        .isString()
        .withMessage('Nickname is required'),
];

const validateRevBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    next();
};

module.exports = { revBodyParams, validateRevBody}