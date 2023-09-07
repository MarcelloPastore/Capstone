// Import required modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const RevPostModel = require('../models/revPostModel.js'); 
const { revBodyParams, validateRevBody } = require('../middlewares/revValidator.js'); // Import middleware functions

const revPost = express.Router(); // Create an Express Router for review posts

/// GET request to fetch all review posts
revPost.get('/revPosts', async (req, res) => {
    const { page = 1, pageSize = 5 } = req.query;

    try {
        // Use Mongoose query to fetch review posts with pagination and populate 'user' field
        const posts = await RevPostModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .populate('user'); // Populate the 'user' field

        // Fetch all review posts from the database (this line is not necessary)
        // const revPosts = await RevPostModel.find();

        // Fetch the total number of review posts (for pagination)
        const totalPosts = await RevPostModel.countDocuments();

        // If there are no review posts, return a 404 error
        if (!posts || posts.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No revPost found in db'
            });
        } 
        
        // Return a 200 response with the list of review posts
        res.status(200).send({
            statusCode: 200,
            totalPosts: totalPosts,
            currentPage: +page,
            pageSize: +pageSize,
            reviewPosts: posts
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


//! GET request to fetch user's posts by nickname
revPost.get('/revPosts/byNickname', async (req, res) => {
    const { userNickname} = req.query;

    try {
        // Find users posts by nickname in the database
        const postByNickname = await RevPostModel.find({ author: { nickname: userNickname } })

        // If no users posts are found, return a 404 error
        if (!postByNickname) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Post not found'
            });
        }

        // Return a 200 response with the matching users
        res.status(200).send({
            statusCode: 200,
            payload: postByNickname
        });
    } catch (error) {
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            error: "Internal server error"
        });
    }
});

//! GET request to fetch posts by title
revPost.get('/revPosts/title', async (req, res) => {
    const { postTitle } = req.query;

    try {
        // Find users posts by nickname in the database
        const postByTitle = await RevPostModel.find({
            title: {
                $regex: '.*' + postTitle + '.*',
                $options: 'i',
            }
        });

        if (!postByTitle) {
            return res.status(404).send({
                statusCode: 404,
                message: `Post ${postTitle} not found`
            });
        }

        // Return a 200 response with the matching users
        res.status(200).send({
            statusCode: 200,
            payload: postByTitle
        });
    } catch (error) {
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            error: "Internal server error"
        });
    }
});

//! GET request to fetch a single review post by ID
revPost.get('/revPost/:revID', async (req, res) => {
    const { revID } = req.params;

    try {
        // Find a review post by its ID in the database
        const revById = await RevPostModel.findById(req.params.revID);
        
        // Return a 200 response with the review post data
        res.status(200).send({
            statusCode: 200,
            review: revById
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

//! POST request to create a new review post
revPost.post('/revPosts/create', revBodyParams, validateRevBody, async (req, res) => {
    try {
         // Create a new review post object with data from the request body
        const newRev = new RevPostModel({
            title: req.body.title,
            img1: req.body.img1,
            img2: req.body.img2,
            description: req.body.description,
            likes: 0,
            views: 0,
            user: req.body.user
        });
        // Save the new review post to the database
        const review = await newRev.save();

        // Return a 201 response with the created review post data
        res.status(201).send({
            statusCode: 201,
            payload: review
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

//! PATCH request to update an existing review post
revPost.patch('/revPost/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the review post exists by ID
    const postExist = await RevPostModel.findById(id);

    // If the review post doesn't exist, return a 404 error
    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `Review not found`
        });
    }

    try {
        // Get data to update from the request body
        const dataToUpdate = req.body;
        const options = { new: true };

        // Update the review post in the database
        const result = await RevPostModel.findByIdAndUpdate(id, dataToUpdate, options);

        // Return a 200 response with the updated review post data
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

//! DELETE request to delete a review post by ID
revPost.delete('/revPost/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the review post exists by ID
    const postExist = await RevPostModel.findById(id);

    // If the review post doesn't exist, return a 404 error
    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `Review not found`
        });
    }

    try {
        // Delete the review post from the database
        const revToDelete = await RevPostModel.findByIdAndDelete(id);

        // Return a 200 response
        res.status(200).send({
            statusCode: 200,
            message: `Review with id ${id} deleted successfully`,
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

// Export the revPost router for use in your application
module.exports = revPost;
