const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    recipe: {
        type : ObjectID,
        required : true
    },

    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require : true
    },

    rating: {
        type : Float,
        required : false
    },

    comment: {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model ('Comment', commentSchema)