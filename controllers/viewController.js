const Recipe = require ('../models/recipe');
const User = require ('../models/User');


const recipe_view = (req, res) => {
    Recipe.find ()
    .then((result) => {
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
    res.render ("login", {title:'Log in | Eats Good!', layout: 'page'});
};

const register_view = (req, res) => {
    res.render ("register", {title:'Register | Eats Good!',layout: 'page'});
};

const edit_account_view = (req, res) => {
    res.render ("editaccount", {title:'Edit Account | Eats Good!',layout: 'page'});
};

const view_account_view  = (req, res) => {
    if (!req.sessions.user)
        res.redirect ('/login');
    else
        res.render ("viewaccount", {title:'View Account | Eats Good!',layout: 'page'});
};

const view_recipe_view = (req, res) => {
    res.render ("viewrecipe", {title: 'View Recipe | Eats Good!',layout: 'page'});
};

const upload_recipe_view = (req, res) => {
    res.render ("uploadrecipe", {title: 'Upload Recipe | Eats Good!',layout: 'page'});
};

const edit_recipe_view = (req, res) => {
    res.render ("editrecipe", {title: 'Edit Recipe | Eats Good!',layout: 'page'});
}

const shopping_list_view = (req, res) => {
    res.render ("shoppinglist", {title: 'Shopping List | Eats Good!',layout: 'page'});
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
