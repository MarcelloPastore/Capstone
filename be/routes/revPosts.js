const express = require('express');
const mongoose = require('mongoose');
const RevPostModel = require('../models/revPostModel.js');
const { revBodyParams, validateRevBody } = require('../middlewares/revValidator.js');




const revPost = express.Router()


// ! Get request ----------------------------------------------------------------------------------------------
revPost.get('/revPosts', async (req, res) => {
    
    try {
        const revPosts = await RevPostModel.find();
        if (!revPosts || revPosts.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No revPost found in db'
            })
        } 
        res.status(200).send({
            statusCode: 200,
            reviewPosts: revPosts
        });
        // controllo
        // console.log("Post richiamati")
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
});
// ! Single get request ----------------------------------------------------------------------------------------------
revPost.get('/revPost/:revID', async (req, res) => {

    const { revID } = req.params
    
try {
    const revById = await RevPostModel.findById(req.params.revID);
    res.status(200).send({
        statusCode: 200,
        review: revById
    });
} catch (error) {
    res.status(500).send({
        statusCode: 500,
        message: 'Internal server error',
        error: error.message
    });
}
});

// ! Post request ----------------------------------------------------------------------------------------------
revPost.post('/revPosts/create',revBodyParams, validateRevBody, async (req,res) => {
    const newRev = new RevPostModel({
        title:req.body.title,
        img1:req.body.img1,
        img2:req.body.img2,
        description:req.body.description,
        likes: 0,
        views: 0,
        nickname: req.body.nickname
    });
    try {
        const review = await newRev.save();

        res.status(201).send({
            statusCode: 201,
            payload:review
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
})

// ! Patch request ----------------------------------------------------------------------------------------------
revPost.patch('/revPost/:id', async (req, res) => {

    const { id } = req.params;

    const postExist = await RevPostModel.findById(id);

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `Review not found`
        });
    }

    try {
        const dataToUpdate = req.body;
        const options = { new: true};

        const result = await RevPostModel.findByIdAndUpdate(id, dataToUpdate, options);

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

// ! Delete request ----------------------------------------------------------------------------------------------
revPost.delete('/revPost/:id', async (req, res) => {
    const { id } = req.params;

    const postExist = await RevPostModel.findById(id);

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `Review not found`
        });
    }

    try {
        const revToDelete = await RevPostModel.findByIdAndDelete(id);
        res.status(200).send({
            statusCode: 200,
            message: `Review with id ${id} deleted successfully`,
        });

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
});


module.exports = revPost;