const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema ({
    list: {
        type : Array,
        required : false
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require : true
    }
});
 
module.exports = mongoose.model ('ShoppingList', shoppingListSchema);