const express = require('express')
const Comment = require('../models/comment')
const commentController = require('../controllers/commentController')

const router = express.Router()

router.post ('/addcomment', commentController.add_comment);
router.post ('/editcomment/:id', commentController.edit_comment);
router.post ('/deletecomment/:id', commentController.delete_comment);

module.exports = router;