var express = require('express');
var router = express.Router();

var Post = require("../models/Post");

/* GET */
router.get('/', (req, res) => {
  Post.find({}, 'title description', (error, posts) => {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})

/* GET single */
router.get('/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', (error, post) => {
    if (error) { console.error(error); }
    res.send(post)
  })
})

/* POST */
router.post('/', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  })
  new_post.save((error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

/* PUT */
router.put('/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', (error, post) => {
    if (error) { console.error(error); }

    post.title = req.body.title
    post.description = req.body.description
    post.save((error) => {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

/* DELETE */
router.delete('/:id', (req, res) => {
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, (err, post) => {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

module.exports = router;