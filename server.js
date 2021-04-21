const express = require ('express');
const dotenv = require ('dotenv');

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.listen (port);

app.get ('/', (req,res) => {
    res.sendFile ('./views/index.html', {root: __dirname});
});

app.get ('/login', (req, res) => {
    res.sendFile ('./views/login.html', {root: __dirname});
});