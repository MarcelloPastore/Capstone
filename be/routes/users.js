// Import required modules and dependencies
const express = require('express');
const userModel = require('../models/userModel'); 
const user = express.Router();
const { validateUserBody, userBodyParams } = require('../middlewares/userValidator.js'); // Import middleware functions
const bcrypt = require('bcrypt');

//! GET request to fetch all users
user.get('/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await userModel.find();

        // If there are no users, return a 404 error
        if (!users || users.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No user found in db'
            })
        }

        // Return a 200 response with the list of users
        res.status(200).send({
            statusCode: 200,
            payload: users
        });
    } catch (error) {
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            error: "Internal server error"
        });
    }
});

//! GET request to fetch a single user by ID
user.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find a user by their ID in the database
        const userExist = await userModel.findById(id);

        // If the user doesn't exist, return a 404 error
        if (!userExist) {
            return res.status(404).send({
                statusCode: 404,
                message: 'User not found'
            });
        }

        // Return a 200 response with the user data
        res.status(200).send({
            statusCode: 200,
            message: 'User found successfully',
            user: userExist
        });
    } catch (error) {
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            error: "Internal server error"
        });
    }
});

//! GET request to fetch users by nickname
user.get('/user/byNickname', async (req, res) => {
    const { userNickname } = req.query;

    try {
        // Find users by nickname in the database
        const userByName = await userModel.find({ nickname: userNickname })

        // If no users are found, return a 404 error
        if (!userByName) {
            return res.status(404).send({
                statusCode: 404,
                message: 'User not found'
            });
        }

        // Return a 200 response with the matching users
        res.status(200).send({
            statusCode: 200,
            payload: userByName
        });
    } catch (error) {
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            error: "Internal server error"
        });
    }
});

//! POST request to create a new user
user.post('/user/create', userBodyParams, validateUserBody, async (req, res) => {
    // Create a new user object with data from the request body

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new userModel({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        email: req.body.email,
        nickname: req.body.nickname,
        password: hashedPassword
    });

    try {
        // Save the new user to the database
        const user = await newUser.save();

        // Return a 201 response with the created user data
        res.status(201).send({
            statusCode: 201,
            payload: user
        });
    } catch (error) {
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            error: "Internal server error"
        });
    }
});

//! PATCH request to update an existing user
user.patch('/user/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the user exists by ID
    const userExist = await userModel.findById(id);

    // If the user doesn't exist, return a 404 error
    if (!userExist) {
        return res.status(404).send({
            statusCode: 404,
            message: 'User not found'
        });
    }

    try {
        // Get data to update from the request body
        const dataToUpdate = req.body;
        const options = { new: true };

        // Update the user in the database
        const result = await userModel.findByIdAndUpdate(id, dataToUpdate, options);

        // Return a 200 response with the updated user data
        res.status(200).send({
            statusCode: 200,
            message: `Review with id ${id} updated successfully`,
            review: result
        });
    } catch (error) {
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
});

//! DELETE request to delete a user by ID
user.delete('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    // Check if the user exists by ID
    const userExist = await userModel.findById(userId);

    // If the user doesn't exist, return a 404 error
    if (!userExist) {
        return res.status(404).send({
            statusCode: 404,
            message: 'User not found'
        });
    }

    try {
        // Delete the user from the database
        const userToDelete = await userModel.findByIdAndDelete(userId);

        // Return a 200 response
        res.status(200).send({
            statusCode: 200,
            message: 'User deleted successfully'
        });
    } catch (error) {
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Export the user router for use in your application
module.exports = user;
