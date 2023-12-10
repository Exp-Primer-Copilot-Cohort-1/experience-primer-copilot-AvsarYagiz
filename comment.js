// Create a web server
// Create a route to handle GET requests
// Create a route to handle POST requests
// Create a route to handle DELETE requests

const express = require('express');
const router = express.Router();

// Import the Comment model
const Comment = require('../models/comment');

// Handle GET requests
router.get('/', (req, res, next) => {
    // res.send('GET request to /comment endpoint');
    Comment.find()
        .exec()
        .then(docs => {
            // console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Handle POST requests
router.post('/', (req, res, next) => {
    // res.send('POST request to /comment endpoint');
    // Create a new Comment model
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId()
    });
});
