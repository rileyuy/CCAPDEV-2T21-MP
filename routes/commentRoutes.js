const express = require('express')
const Comment = require('../models/comment')
const upload = require ('../middleware/multer');
const commentController = require('../controllers/commentController')

const router = express.Router()

router.post ('/', upload.single("filename"), (req, res) => {
    let comment = new Comment(req.body)
    console.log(comment)

    recipe.save()
    .then((result) => {
        res.redirect ('/recipes');
    })
    .catch ((err) => {
        console.log (err);
    })
})

module.exports = router;