// Import required modules and dependencies
const express = require('express');
const userModel = require('../models/userModel');
const user = express.Router();
const { validateUserBody, userBodyParams } = require('../middlewares/userValidator.js');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary for cloud storage
cloudinary.config({
  cloud_name: 'do1eu7dnn',
  api_key: '228316619334122',
  api_secret: 'S81GXJv4Rrq8KIvNa9MjAv2pkvc'
});

// Create a Cloudinary storage object for file uploads
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'GamersBlog', // Specify the folder in Cloudinary
    format: async (req, file) => 'png', // Specify the file format
    public_id: (req, file) => file.name // Specify the public ID
  }
});

// Create a multer middleware for handling file uploads to Cloudinary
const cloudUpload = multer({ storage: cloudStorage });

// Define a route to handle profile picture uploads to Cloudinary
user.post('/user/cloudUpload', cloudUpload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded.'); // Check if a file was uploaded
    }
    res.status(200).json({ profilePicture: req.file.path }); // Respond with the file path
  } catch (error) {
    console.error('File upload failed', error);
    res.status(500).send({
      statusCode: 500,
      message: 'File upload failed',
    });
  }
});

// Define a route to fetch all users
user.get('/users', async (req, res) => {
  try {
    const users = await userModel.find(); // Retrieve all users from the database
    if (!users || users.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: 'No user found in db'
      });
    }
    res.status(200).send({
      statusCode: 200,
      payload: users
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send({
      statusCode: 500,
      error: 'Internal server error'
    });
  }
});

// Define a route to fetch a single user by ID
user.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userExist = await userModel.findById(id); // Find a user by ID
    if (!userExist) {
      return res.status(404).send({
        statusCode: 404,
        message: 'User not found'
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: 'User found successfully',
      user: userExist
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send({
      statusCode: 500,
      error: 'Internal server error'
    });
  }
});

// Define a route to fetch users by nickname
user.get('/user/byNickname', async (req, res) => {
  const { userNickname } = req.query;
  try {
    const userByName = await userModel.find({ nickname: userNickname }); // Find users by nickname
    if (!userByName || userByName.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: 'User not found'
      });
    }
    res.status(200).send({
      statusCode: 200,
      payload: userByName
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send({
      statusCode: 500,
      error: 'Internal server error'
    });
  }
});

// POST request to create a new user
user.post('/user/create', userBodyParams, validateUserBody, async (req, res) => {
    try {
      const saltRounds = 10; // Specify the number of salt rounds for bcrypt
  
      // Check if the request body contains a valid password field
      if (!req.body.password) {
        return res.status(400).send({
          statusCode: 400,
          error: 'Password is required'
        });
      }
  
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
      // Create a new user object with the hashed password
      const newUser = new userModel({
        name: req.body.name,
        surname: req.body.surname,
        profilePicture: req.body.profilePicture,
        age: req.body.age,
        email: req.body.email,
        nickname: req.body.nickname,
        password: hashedPassword
      });
  
      // Save the new user to the database
      const user = await newUser.save();
  
      // Return a 201 response with the created user data
      res.status(201).send({
        statusCode: 201,
        payload: user
      });
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).send({
        statusCode: 500,
        error: 'Internal server error'
      });
    }
  });

// Define a route to update an existing user by ID and populate comments and posts
user.patch('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Use `.populate()` to fetch the user and populate comments and posts
    const userExist = await userModel.findById(id)
      .populate('comments') // Populate the 'comments' field
      .populate('posts'); // Populate the 'posts' field

    if (!userExist) {
      return res.status(404).send({
        statusCode: 404,
        message: 'User not found'
      });
    }

    // Update the user's data with the new data from the request body
    const dataToUpdate = req.body;
    const options = { new: true };
    const result = await userModel.findByIdAndUpdate(id, dataToUpdate, options);

    // Respond with the updated user, which now contains populated comments and posts
    res.status(200).send({
      statusCode: 200,
      message: `User with id ${id} updated successfully`,
      user: result
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
});


// Define a route to delete a user by ID
user.delete('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const userExist = await userModel.findById(userId); // Check if the user exists by ID
  if (!userExist) {
    return res.status(404).send({
      statusCode: 404,
      message: 'User not found'
    });
  }
  try {
    const userToDelete = await userModel.findByIdAndDelete(userId); // Delete the user from the database
    res.status(200).send({
      statusCode: 200,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Export the user router for use in your application
module.exports = user;
