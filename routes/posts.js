const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const postId = require('mongoose').Types.postId;

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
        if (err) {
          res.status(400)
          res.json({
            success: false,
            message: 'Invalid ID'
          })
          res.end()
          return
        }
    
        if (!data) {
          res.status(404)
          res.json({
            success: false,
            message: `Cannot find items with the itemId: ${postId}`
          })
          res.end()
          return
        }
        res.status(200)
        res.json({
          success: true,
          message: `Item found`,
          data: data
        })
        res.end()
        return
      })
});

// Remove a items by ID

router.delete('/:postId', async (req, res) => {

    Post.findByIdAndDelete(req.params.postId, (err, data) => {
        if (err) {
          res.status(400)
          res.json({
            success: false,
            message: 'Invalid ID'
          })
          res.end()
          return
        }
    
        if (!data) {
          res.status(404)
          res.json({
            success: false,
            message: `Cannot find items with the itemId: ${postId}`
          })
          res.end()
          return
        }
        res.status(200)
        res.json({
          success: true,
          message: 'Deleted items matches to ID', 
          showitem: data
        })
        res.end()
        return
    
      })
   
});

// Update a items by ID

router.put('/:postId', async (req, res) => {


    const item = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    };

    Post.findByIdAndUpdate(req.params.postId, { $set: item }, { new: true }, (err, data) =>  {
        if (err) {
          res.status(400)
          res.json({
            success: false,
            message: 'Invalid ID'
          })
          res.end()
          return
        }
    
        if (!data) {
          res.status(404)
          res.json({
            success: false,
            message: `Cannot find items with the itemId: ${postId}`
          })
          res.end()
          return
        }
        res.status(200)
        res.json({
          success: true,
          message: `Item Updated Successfully`,
          updateItem: data
        })
        res.end()
        return
      })
    
});

module.exports = router;