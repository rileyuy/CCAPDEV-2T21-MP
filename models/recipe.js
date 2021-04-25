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
    // img:
    // {
    //     data: Buffer,
    //     contentType: String
    // }
}, {timestamps : true});

const Recipe = mongoose.model ('Recipe', recipeSchema);
module.exports = Recipe;