const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeName: {
        type : String,
        required : true
    },

    recipeIngredients: {
        type : String,
        required : true
    },

    recipeInstructions: {
        type : String,
        required : true
    },

    img: {
        data: Buffer, 
        contentType: String
    },
    
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required : true
    },

    rating:{
        type: Number,
        required: false,
        default: null
    },

    createdDate:{
        type: String,
        required: false
    }
}, {timestamps : true});

module.exports = mongoose.model ('Recipe', recipeSchema);