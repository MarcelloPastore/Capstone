const isValidRev = (req, res, next) => {
    const errors = [];

    const { title, description, nickname } = req.body;

    if (typeof title !== 'string') {
        errors.push('RevPost title must be a string');
    }
    
    if (typeof description !== 'string' || description.length < 15) {
        errors.push('RevPost description must be a string and at least 15 characters');
    }

    if (typeof nickname !== 'string') {
        errors.push('RevPost nickname must be a string');
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        next();
    }
};

module.exports = isValidRev;