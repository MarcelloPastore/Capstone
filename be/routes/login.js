const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

loginRouter.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found'
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid password'
            });
        }

        // Generate a JWT token
        const token = jwt.sign(
            {
                name: user.name,
                surname: user.surname,
                email: user.email,
                age: user.age,
                profilePicture: user.profilePicture,
                nickname: user.nickname,
                id: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.header('Authorization', token).status(200).send({
            statusCode: 200,
            token
        });
    } catch (error) {
        // Handle errors (e.g., database errors, token generation errors)
        console.error('Error:', error);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
});

module.exports = loginRouter;
