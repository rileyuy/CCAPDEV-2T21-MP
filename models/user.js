const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    name: {
        type: String,
        //required : true
    },

    ingredients: {
        type: String,
        //required : true
    },

    recipeId: {
        type :  mongoose.Schema.ObjectId,
        ref: "Recipe",
        //required : true
    }
})

const userSchema = new Schema({
    email: {
        type : String,
        required : true
    },

    password: {
        type : String,
        required : true
    },

    firstName: {
        type : String,
        required : true
    },

    lastName: {
        type : String,
        required : true
    },

    shoppingList: [shoppingListSchema]
}, {timestamps : true});

//fixes global and exception handling error
if (mongoose.models.User) {
    User = mongoose.model('User');
  } else {
    User = mongoose.model('User', userSchema);
  }

module.exports = User;