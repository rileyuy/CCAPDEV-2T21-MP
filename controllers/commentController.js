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

const edit_comment = async (req, res) => {
    var commentId = req.params.id;
    if (req.body.rating) {
        let update = {rating : req.body.rating}
        await Comment.findOneAndUpdate( {_id: commentId}, update, {useFindAndModify: false});
    }
    
    if (req.body.userComment){
        let update = {userComment : req.body.userComment}
        await Comment.findOneAndUpdate( {_id: commentId}, update, {useFindAndModify: false});
    }

    res.redirect ('back');
}

const delete_comment = (req, res) => {
    const commentId = req.params.id;

    Comment.findOneAndRemove ({_id: commentId}, function (err) {
        if (!err) {
            res.redirect('back')
        }
        else{
            console.log (err);
            res.redirect ('/');
        }
    })
}


module.exports = {
    edit_comment,
    delete_comment,
    add_comment
}