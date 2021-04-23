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
    //res.sendFile ('./views/index.hbs', {root: __dirname});
    res.render ("main");
});

app.get ('/login', (req, res) => {
    // res.sendFile ('./views/login.hbs', {root: __dirname});
});