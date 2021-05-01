const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    recipe: {
        type :  mongoose.Schema.ObjectId,
        ref: "Recipe",
        required : false
    },

    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require : false
    },

    rating: {
        type : Number,
        required : false
    },

    userComment: {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model ('Comment', commentSchema)