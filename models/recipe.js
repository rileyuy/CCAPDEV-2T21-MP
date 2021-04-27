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
    img:
    {
        type: String,
        required : true
    },
    comments:{
        type : Array,
        required : false
    }
}, {timestamps : true});

module.exports = mongoose.model ('Recipe', recipeSchema);