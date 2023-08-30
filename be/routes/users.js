const express= require('express');
const userModel = require('../models/userModel');
const user = express.Router();

// ! Get request ----------------------------------------------------------------------------------------------
user.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();

        if (!users || users.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No user found in db'
            })
        }

        res.status(200).send({
            statusCode: 200,
            payload: users
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            error: "Internal server error"
        });
    }
});

// ! post request ----------------------------------------------------------------------------------------------
user.post('/user/create', async (req, res) => {
    const newUser = new userModel({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password
    });

    try {
        const user = await newUser.save();

        res.status(201).send({
            statusCode: 201,
            payload:user
        });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        error: "Internal server error"
      });  
    }
});
// ! patch request ----------------------------------------------------------------------------------------------
user.patch('/user/:id', async (req,res) => {
    const { id } = req.params;

    const userExist = await userModel.findById(id);

    if (!userExist) {
        return res.status(404).send({
            statusCode: 404,
            message: 'User not found'
        });
    }

    try {
        const dataToUpdate = req.body;
        const options = { new: true };

        const result = await userModel.findByIdAndUpdate(id, dataToUpdate, options);

        res.status(200).send({
            statusCode: 200,
            message: `Review with id ${id} updated successfully`,
            review: result
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
});
// ! patch request ----------------------------------------------------------------------------------------------
user.delete('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    const userExist = await userModel.findById(userId);

    if (!userExist) {
        return res.status(404).send({
            statusCode: 404,
            message: 'User not found'
        });
    }

    try {
        const userToDelete = await userModel.findByIdAndDelete(userId);
        res.status(200).send({
            statusCode: 200,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
});



module.exports = user;