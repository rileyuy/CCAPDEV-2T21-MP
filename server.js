const express = require ('express')
const expressValidator = require ('express-validator')
const bodyParser = require ('body-parser')
const exphbs = require ('express-handlebars')
const dotenv = require ('dotenv')
const morgan = require ('morgan')
const mongoose = require ('mongoose')
const cookieParser = require ('cookie-parser')
const methodOverride = require('method-override')

//express app
const app = express();

const fs = require('fs');
var path = require('path');

//routes

const recipeRoutes = require ('./routes/recipeRoutes')
const viewRoutes = require ('./routes/viewRoutes')
const userRoutes = require ('./routes/userRoutes')
const authRoutes = require ('./routes/authRoutes')
const commentRoutes = require ('./routes/commentRoutes')
const {authenticate} = require ('./middleware/authenticate')
const {updateRating} = require ('./middleware/rating')

const hbs = exphbs.create ({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {"imagePost": (value) => {
        
        if(value !== undefined && value.contentType && value.data){
            return "data:"+value.contentType+";base64,"+value.data.toString('base64');
        }
        return "/img/default.png";
    }}
});



//connect to mongodb
const dbURI = 'mongodb+srv://arren:j6Eg3-sJgundeqD@cluster0.lwgsy.mongodb.net/ccapdev-mp?retryWrites=true;'
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

app.use (authenticate);
app.use (updateRating);
app.use (viewRoutes);
app.use (authRoutes);
app.use (userRoutes);
app.use (recipeRoutes);
app.use (commentRoutes);