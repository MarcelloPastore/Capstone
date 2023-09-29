// Import required modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const RevPostModel = require('../models/revPostModel.js'); 
const { revBodyParams, validateRevBody } = require('../middlewares/revValidator.js'); // Import middleware functions
const CommentModel = require('../models/commentModel.js')
const UserModel = require('../models/userModel.js')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const crypto = require('crypto');
const revPost = express.Router(); // Create an Express Router for review posts
const verifyToken = require('../middlewares/verifyToken.js');


// cloudinary storage
cloudinary.config({ 
    cloud_name: 'do1eu7dnn', 
    api_key: '228316619334122', 
    api_secret: 'S81GXJv4Rrq8KIvNa9MjAv2pkvc' 
  });

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary, 
    params: {
        folder: 'GamersBlog',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name
    }
});

const cloudUpload = multer({ storage: cloudStorage });

revPost.post('/revPosts/cloudUpload', cloudUpload.single('img1'), verifyToken, async (req, res) => {
    try {
        res.status(200).json({ img1: req.file.path });
    } catch (error) {
        console.error('File upload failed', error);
        res.status(500).send({
            statusCode: 500,
            message: 'File upload failed',
        });
    }
});

//! GET request to fetch all review posts
revPost.get('/revPosts', async (req, res) => {
    const { page = 1, pageSize = 8 } = req.query;

    try {
        // Use Mongoose query to fetch review posts with pagination and populate 'user' field
        const posts = await RevPostModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .populate('user', 'name surname email nickname profilePicture') // Populate the 'user' field
            .populate('comments', 'content nickname') 

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

revPost.get('/revPosts/byUserId', async (req, res) => {
    const { userId } = req.query; // Assuming you pass the user's ID as a query parameter
  
    try {
      // Find posts by user's ID in the database
      const postsByUserId = await RevPostModel.find({ 'user': userId })
      .populate('user', 'name surname email nickname profilePicture') // Populate the 'user' field
    .populate('comments', 'content nickname') ;
  
      // If no posts are found, return a 404 error
      if (!postsByUserId || postsByUserId.length === 0) {
        return res.status(404).send({
          statusCode: 404,
          message: 'No posts found for the user with ID: ' + userId
        });
      }
  
      // Return a 200 response with the matching posts
      res.status(200).send({
        statusCode: 200,
        payload: postsByUserId
      });
    } catch (error) {
      // Handle internal server error
      res.status(500).send({
        statusCode: 500,
        error: 'Internal server error'
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
        // Find a review post by its ID in the database and populate comments
        const revById = await RevPostModel.findById(revID)
        .populate('user', 'name surname email nickname profilePicture') // Populate the 'user' field
        .populate('comments', 'content nickname') 

        if (!revById) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Review post not found'
            });
        }

        // Return a 200 response with the review post data and comments
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

//! POST request to add a new comment to a review post
revPost.post('/revPost/:revID/comments', async (req, res) => {
    const { revID } = req.params;

    try {
        // Check if the review post exists by ID
        const postExist = await RevPostModel.findById(revID);

        if (!postExist) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Review post not found'
            });
        }

        // Retrieve the user's nickname and content from the 'User' model
        const user = await UserModel.findById(req.body.user);

        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'User not found'
            });
        }

        // Create a new comment object with user's nickname, content, and other data
        const newComment = new CommentModel({
            user: user._id,
            nickname: user.nickname,
            content: req.body.content,
            postId: revID
        });

        // Save the new comment to the database
        const comment = await newComment.save();

        // Add the comment's ObjectId to the 'comments' array in the review post
        postExist.comments.push(comment._id);
        await postExist.save();

        // Return a 201 response with the created comment data
        res.status(201).send({
            statusCode: 201,
            payload: comment
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
revPost.post('/revPosts/create', verifyToken, revBodyParams, validateRevBody, async (req, res) => {
    console.log(req.get('Authorization'))
    try {
        // Create a new review post object with data from the request body
        const newRev = new RevPostModel({
            title: req.body.title,
            img1: req.body.img1,
            description: req.body.description,
            likes: 0,
            views: 0,
            user: req.body.user
        });

        // Save the new review post to the database
        const review = await newRev.save();
        console.log('Review saved:', review);

        // Return a 201 response with the created review post data
        res.status(201).send({
            statusCode: 201,
            payload: review
        });
    } catch (error) {
        console.error('Error creating review:', error);
        // Handle internal server error
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
});

//! PATCH request to update an existing review post
revPost.patch('/revPost/:id', verifyToken, async (req, res) => {
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
revPost.delete('/revPost/:id', verifyToken, async (req, res) => {
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

// POST route to increment views for a specific post
revPost.patch('/revPosts/incrementViews/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      // Find the post by ID and increment its view count
      const post = await RevPostModel.findByIdAndUpdate(postId, { $inc: { views: 1 } }, { new: true });
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Views incremented successfully', updatedPost: post });
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  revPost.patch('/revPosts/incrementLikes/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      // Find the post by ID and increment its view count
      const post = await RevPostModel.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Likes incremented successfully', updatedPost: post });
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Export the revPost router for use in your application
module.exports = revPost;
