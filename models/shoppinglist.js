const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema ({
    list: {
        type : Array,
        required : false
    }
});
 
module.exports = mongoose.model ('ShoppingList', shoppingListSchema);