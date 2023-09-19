const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get the Authorization header from the request
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Missing authorization header',
        });
    }

    // You need to extract the token part.
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Invalid token format',
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // Call next middleware
    } catch (error) {
        res.status(403).json({
            errorType: 'Token error',
            statusCode: 403,
            message: 'Not a valid token',
        });
    }
};
