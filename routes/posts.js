const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const ItemtId = require('mongoose').Types.ItemtId; 

//Find all items
router.get('/', async (req, res) => {
    
    Post.find({}, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'All items', findAll: data})

        } else {
            console.log(err);
        }
    });
});

//Add items

router.post('/', async (req, res) => {
    const post = new Post({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
        
    });
    post.save((err, data) => {
        if(!err) {
            res.status(201).json({code: 200, message: 'Items Added Successfully', additem: data})
        } else {
          res.status(400).send("Error occured");
        }
    });
   
 });

// Find a items by item ID

router.get('/:postId', async (req, res) => {

    Post.findById(req.params.postId, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Items matches to ID', showitem: data})
        } else {
          res.status(400).send("Invalid ID");
        }
    });
});

// Remove a items by ID

router.delete('/:postId', async (req, res) => {
    
  

    Post.delete(req.params.postId, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Deleted items matches to ID', showitem: data})
        } else {
          res.status(400).send("Invalid ID");
        }
    });
   
});

// Update a items by ID

router.put('/:postId', (req, res) => {


    const item = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    };
    Post.findByIdAndUpdate(req.params.postId, { $set: item }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Item Updated Successfully', updateItem: data})
        } else {
            res.status(400).send("Invalid ID");
        }
    });
});


module.exports = router;