const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    recipe: {
        type : ObjectID,
        required : true
    },

    user: {
        type : ObjectID,
        required : true
    },

    rating: {
        type : Float,
        required : true
    },

    comment: {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model ('Comment', commentSchema)