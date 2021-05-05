const Comment = require ('../models/comment')
const Recipe = require ('../models/recipe')
const User = require ('../models/user')

const add_comment = (req, res) => {
    const comment = new Comment(req.body)
    
    comment.save()
    .then((result) => {
        Recipe.find ({userId : result.userId._id}).then(results => {
            res.redirect ('back');
        })
        .catch (err => {
            console.log (err);
        })
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
                    updateComment.rating = req.body.rating
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
        if (!err) {
            res.redirect('/')
        }
    })
}


module.exports = {
    edit_comment,
    delete_comment,
    add_comment
}