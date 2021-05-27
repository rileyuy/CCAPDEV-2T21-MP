const express = require('express')
const Comment = require('../models/comment')
const commentController = require('../controllers/commentController')

const router = express.Router()

router.post ('/addcomment', commentController.add_comment);
router.put ('/editcomment/:id/update', commentController.edit_comment);
router.get ('/deletecomment/:id', commentController.delete_comment);

module.exports = router;