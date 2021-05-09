const User = require ('../models/user')
const ShoppingList = require ('../models/shoppinglist')
const Recipe = require('../models/recipe')

const addOne_shoppingList = (req, res) => {
    const recipeId = req.params.id;
    const userId = res.locals.user._id;

    ShoppingList.findOne ({userId: userId})
    .then (shoppingList => {
        let i = 0;
        let parsedList = JSON.parse(JSON.stringify(shoppingList));
        var recipeMatched = false;
        console.table (shoppingList);
        while (i < parsedList.list.length){
            if ((parsedList.list[i].localeCompare (JSON.stringify(recipeId)))){
                recipeMatched = true;
            }
            i++;
        }
        
        if (!recipeMatched){
            
        }
    })
    .catch (err=>{
        console.log (err);
        res.redirect('/');
    })

    
}

const deleteOne_shoppingList = (req, res) => {

}


module.exports = {
    deleteOne_shoppingList,
    addOne_shoppingList
}