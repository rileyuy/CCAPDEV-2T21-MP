const Recipe = require ('../models/recipe');
const User = require ('../models/User');

const recipe_view = (req, res) => {
    Recipe.find().populate ('userId')
    .then((result) => {
        console.log (result);
        
        res.render ("recipes", {
            title: 'Recipes | Eats Good!', 
            layout: 'page', 
            recipes: JSON.parse(JSON.stringify(result))
        });
    })
    .catch ((err) => {
        console.log (err);
    });
}

const about_view = (req,res) => {
    res.render ("home", {title: 'Home | Eats Good!'});
};

const login_view = (req, res) => {
    if (res.locals.user){
       res.redirect ('/');
    }
    else{
         if (req.params.type == "registered")
            res.render ("login", {title:'Log in | Eats Good!', layout: 'page', text: "Successfully registered!"});
        else
            res.render ("login", {title:'Log in | Eats Good!', layout: 'page', text: ""});
    }
};

const register_view = (req, res) => {
    if (res.locals.user){
        res.redirect ('/');
    }
    else{
        res.render ("register", {title:'Register | Eats Good!',layout: 'page'});
    }
};

const edit_account_view = (req, res) => {
    if (res.locals.user){
        res.render ("editaccount", {title:'Edit Account | Eats Good!',layout: 'page'});
    }
    else{
        res.redirect ('/login');
    }
};

const view_account_view  = async (req, res) => {
    const qUser = await User.findById(req.params.id).lean() 
    console.log (qUser); 
    let isMe = true;

    if (res.locals.user._id == undefined){
        console.log ("inside view_account_view user is undefined!");
        res.redirect ('/');
    }

    if (res.locals.user.id == qUser.id)
        isMe = true; //asserts isMe = true;
    else
        isMe=false;

    Recipe.find ()
    .then( (result) => {
        const jsonUserRecipes = JSON.parse(JSON.stringify(result))
        console.log (jsonUserRecipes);
        res.render ("viewaccount", {title:'View Account | Eats Good!',layout: 'page', queriedUser: qUser, isMe: isMe, userRecipes: jsonUserRecipes});
    })
    .catch ((err) => {
        console.log (err);
    });
    
};

const view_recipe_view = (req, res) => {
    if (res.locals.user){
        res.render ("viewrecipe", {title: 'View Recipe | Eats Good!',layout: 'page'});
    }
    else{
        res.redirect ('/login');
    }
    
};

const upload_recipe_view = (req, res) => {
    if (res.locals.user){
        res.render ("uploadrecipe", {title: 'Upload Recipe | Eats Good!',layout: 'page'});
    }
    else{
        res.redirect ('/login');
    }
};

const edit_recipe_view = async (req, res) => {
    const qRecipe = await Recipe.findById(req.params.id).lean() 
    
        if (res.locals.user){
            res.render ("editrecipe", {title: 'Edit Recipe | Eats Good!',layout: 'page', qRecipe: qRecipe});
        }
        else{
            res.redirect ('/login');
        }
    
    
}

const shopping_list_view = (req, res) => {
    if (res.locals.user){
        res.render ("shoppinglist", {title: 'Shopping List | Eats Good!',layout: 'page'});
    }
    else{
        res.redirect ('/login');
    }
    
};

module.exports = {
    recipe_view,
    edit_recipe_view,
    shopping_list_view,
    upload_recipe_view,
    view_recipe_view,
    view_account_view,
    edit_account_view,
    register_view,
    login_view,
    about_view
}
