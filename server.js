const express = require ('express');
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars');
const dotenv = require ('dotenv');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const cookieParser = require ('cookie-parser');
const methodOverride = require('method-override')

const fs = require('fs');
var path = require('path');

//routes

const recipeRoutes = require ('./routes/recipeRoutes')
const viewRoutes = require ('./routes/viewRoutes')
const userRoutes = require ('./routes/userRoutes')
const authRoutes = require ('./routes/authRoutes')
const commentRoutes = require ('./routes/commentRoutes')
const {authenticate, checkUser} = require ('./middleware/authenticate')

const hbs = exphbs.create ({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
});

//express app
const app = express();

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
app.use(cookieParser());
app.use(methodOverride('_method'))
app.set ('view engine', "hbs");
app.engine ('hbs', hbs.engine);

//app.get ('*', checkUser);
app.use (authenticate);
app.use (viewRoutes);
app.use (authRoutes);
app.use (userRoutes);
app.use (recipeRoutes);
app.use (commentRoutes);