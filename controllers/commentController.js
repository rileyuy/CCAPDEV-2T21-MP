const Comment = require ('../models/comment')

const edit_comment = (req, res) => {
    var commentId = req.params.id

    Recipe.findOne ({_id: recipeId}, function (err, updateComment) {
        if (err) {
            console.log(err)
            res.send()
        } else {
            if (!updateRecipe) {
                res.send()
            } else {
                if (req.body.comment) {
                    updateComment.comment = req.body.comment
                }

                updateRecipe.save (function (errors, updateComment) {
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
    delete_comment
}