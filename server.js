const express = require ('express');
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars');
const dotenv = require ('dotenv');
const morgan = require ('morgan');
const mongoose = require ('mongoose');

const fs = require('fs');
var path = require('path');

//routes
const recipeRoutes = require ('./routes/recipeRoutes')

//schemas
const User = require ('./models/user');
const Recipe = require ('./models/recipe');
const ShoppingList = require ('./models/shoppinglist');

const hbs = exphbs.create ({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
});

//express app
const app = express();

//storage for recipe pics


//connect to mongodb
const dbURI = 'mongodb+srv://riley:1234@cluster0.lwgsy.mongodb.net/ccapdev-mp?retryWrites=true;'
mongoose.connect (dbURI, {useNewUrlParser : true, useUnifiedTopology: true})
    .then ((result) => app.listen (port, ()=> {
        console.log ('Listening to port number ' + port);}))
    .catch ((err) => console.log (err));


dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use (express.static(__dirname + "/"));
app.use (bodyParser.json());
app.use (express.urlencoded({extended:true}));

app.use (morgan('dev'));

app.set ('view engine', "hbs");
app.engine ('hbs', hbs.engine);

app.get ('/', (req,res) => {
    res.render ("home", {title: 'Home | Eats Good!'});
});

app.get ('/login', (req, res) => {
    res.render ("login", {title:'Log in | Eats Good!', layout: 'page'});
});

app.get ('/register', (req, res) => {
    res.render ("register", {title:'Register | Eats Good!',layout: 'page'});
});

app.get ('/editaccount', (req, res) => {
    res.render ("editaccount", {title:'Edit Account | Eats Good!',layout: 'page'});
});


app.get ('/viewaccount', (req, res) => {
    res.render ("viewaccount", {title:'View Account | Eats Good!',layout: 'page'});
});

app.get ('/editrecipe', (req, res) => {
    res.render ("editrecipe", {title: 'Edit Recipe | Eats Good!',layout: 'page'});
});

app.get ('/viewrecipe', (req, res) => {
    res.render ("viewrecipe", {title: 'View Recipe | Eats Good!',layout: 'page'});
});

app.get ('/uploadrecipe', (req, res) => {
    res.render ("uploadrecipe", {title: 'Upload Recipe | Eats Good!',layout: 'page'});
});

app.get ('/shoppinglist', (req, res) => {
    res.render ("shoppinglist", {title: 'Shopping List | Eats Good!',layout: 'page'});
});

app.use (recipeRoutes);