const Recipe = require('../models/recipe');
const User = require('../models/User');
const Comment = require('../models/comment.js')

function loadRatings(recipes) {
    console.log(recipes)
    for (var key in recipes){
        //console.log (recipes[key]._id )
        Comment.find({ recipeId: recipes[key]._id }).populate('userId')
        .then(userComments => {
            const parsedComments = JSON.parse(JSON.stringify(userComments));
            var i = 0;
            var averageRating = 0.0;

            console.table(parsedComments)
            //console.log(parsedComments.length)
            var update;
            if (parsedComments.length != 0) {
                while (i < parsedComments.length) {
                    averageRating += parsedComments[i].rating;
                    i++;
                }
                averageRating /= i;
                
                update = {rating : averageRating};
                updateRating (recipes[key]._id, update);
                
            } else {
                console.log ("RATING IS NULL!");
                update = {rating : null};
                updateRating (recipes[key]._id, update);
            }
            
            
        })
        .catch((err) => {
            res.render('404');
            console.log(err);
        })
    }
        
}

async function updateRating (recipeId, update) {

    try{
        const recipe = await Recipe.findOneAndUpdate ({id: recipeId._id}, update, {useFindAndModify: false});
        console.log ("updated " + recipe.recipeName + " with average rating " + recipe.rating);
    } 
    catch(err){
        console.log(err);
    }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const recipe_view = (req, res, next) => {
    Recipe.find().populate('userId').sort({ createdAt: -1 })
        .then((result) => {
            loadRatings (JSON.parse(JSON.stringify(result)));
            res.render("recipes", {
                title: 'Recipes | Eats Good!',
                layout: 'page',
                recipes: JSON.parse(JSON.stringify(result))
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

const searched_recipe_view = (req, res) => {
    var queryName = JSON.parse(JSON.stringify(req.body.recipeName));
    console.log(queryName)
    const regex = new RegExp(escapeRegex(queryName), 'gi');
    Recipe.find({ recipeName: regex }).populate('userId').sort({ createdAt: -1 })
        .then((queriedRecipes) => {
            res.render("recipes", {
                title: 'Recipes | Eats Good!',
                layout: 'page',
                recipes: JSON.parse(JSON.stringify(queriedRecipes))
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

const about_view = (req, res) => {
    var isLoggedIn = false;
    if (res.locals.user) isLoggedIn = true;

    res.render("home", { title: 'Home | Eats Good!', isLoggedIn: isLoggedIn });


};

const login_view = (req, res) => {
    var error = false;

    if (res.locals.user) {
        res.redirect('/');
    }
    else {
        switch (req.params.type) {
            case "registered":
                res.render("login", { title: 'Log in | Eats Good!', layout: 'page', text: "Successfully registered!", error: error });
                break;
            case "wrongpass":
                error = true;
                res.render("login", { title: 'Log in | Eats Good!', layout: 'page', text: "Wrong Password!", error: error });
                break;
            case "wrongemail":
                error = true;
                res.render("login", { title: 'Log in | Eats Good!', layout: 'page', text: "Email is not registered!", error: error });
                break;
            default:
                res.render("login", { title: 'Log in | Eats Good!', layout: 'page', text: "", error: error });
                break;
        }
    }
};

const register_view = (req, res) => {
    if (res.locals.user) {
        res.redirect('/');
    }
    else {
        res.render("register", { title: 'Register | Eats Good!', layout: 'page' });
    }
};

const edit_account_view = (req, res) => {
    if (res.locals.user) {
        res.render("editaccount", { title: 'Edit Account | Eats Good!', layout: 'page' });
    }
    else {
        res.redirect('/login');
    }
};

const view_account_view = async (req, res) => {
    const qUser = await User.findById(req.params.id).lean();
    let isMe = true;

    if (res.locals.user._id == undefined) {
        res.redirect('/');
    }


    if (JSON.parse(JSON.stringify(res.locals.user._id)).localeCompare(JSON.parse(JSON.stringify(qUser._id))) === 0)
        isMe = true; //asserts isMe = true;
    else
        isMe = false;

    Recipe.find({ userId: qUser._id })
        .then((result) => {
            const jsonUserRecipes = JSON.parse(JSON.stringify(result))
            res.render("viewaccount", { title: 'View Account | Eats Good!', layout: 'page', queriedUser: qUser, isMe: isMe, userRecipes: jsonUserRecipes });
        })
        .catch((err) => {
            console.log(err);
        });

};

const upload_recipe_view = (req, res) => {
    if (res.locals.user) {
        res.render("uploadrecipe", { title: 'Upload Recipe | Eats Good!', layout: 'page' });
    }
    else {
        res.redirect('/login');
    }
};

const edit_recipe_view = async (req, res) => {
    const qRecipe = await Recipe.findById(req.params.id).lean()

    if (res.locals.user) {
        res.render("editrecipe", { title: 'Edit Recipe | Eats Good!', layout: 'page', qRecipe: qRecipe });
    }
    else {
        res.redirect('/login');
    }


}

const shopping_list_view = (req, res) => {
    if (res.locals.user) {
        const shoppingList = JSON.parse(JSON.stringify(res.locals.user.shoppingList));
        res.render("shoppinglist", { title: 'Shopping List | Eats Good!', layout: 'page', shoppingList: shoppingList });
    }
    else {
        res.redirect('/login');
    }

};

module.exports = {
    recipe_view,
    searched_recipe_view,
    edit_recipe_view,
    shopping_list_view,
    upload_recipe_view,
    view_account_view,
    edit_account_view,
    register_view,
    login_view,
    about_view
}