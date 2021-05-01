const Comment = require ('../models/comment')
const Recipe = require ('../models/recipe')
const User = require ('../models/user')

const add_comment = (req, res) => {
    const comment = new Comment(req.params.body)
    console.log(req.params.body)

    comment.save()
    .then((result) => {
        res.redirect ('/');
    })
    .catch ((err) => {
        console.log (err);
    })
}

const edit_comment = (req, res) => {
    var commentId = req.params.id

    Comment.findOne ({_id: commentId}, function (err, updateComment) {
        if (err) {
            console.log(err)
            res.send()
        } else {
            if (!updateComment) {
                res.send()
            } else {
                if (req.body.comment) {
                    updateComment.comment = req.body.comment
                }

                updateComment.save (function (errors, updatedComment) {
                    if (errors) {
                        res.send()
                    } else {
                        res.redirect('/')
                    }
                })
            }
        }
    })
}

const delete_comment = (req, res) => {
    const id = req.params.id;

    Comment.findOneAndRemove ({_id: id}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
}


module.exports = {
    edit_comment,
    delete_comment,
    add_comment
}