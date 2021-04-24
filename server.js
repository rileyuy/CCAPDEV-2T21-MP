const express = require ('express');
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars');
const dotenv = require ('dotenv');
const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use (express.static(__dirname + "/"))
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:true}));

app.set ('view engine', "hbs");
app.engine ('hbs', exphbs ({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}));

app.listen (port, ()=> {
    console.log ('Listening to port number ' + port);
});

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

app.get ('/recipes', (req, res) => {
    res.render ("recipes", {title: 'Recipes | Eats Good!', layout: 'page'});
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