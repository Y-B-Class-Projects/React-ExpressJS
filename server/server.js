const express = require('express')
const bodyParser = require('body-parser');
const mongo = require("mongoose");
const favicon = require('express-favicon');
const sessions = require('express-session');
var cookieParser = require('cookie-parser');
const app = express()
const port = 5000
const path = require("path");

const Blockchain = require('./blockchain/blockchain');
const Levcoin = require('./levcoin/levcoin');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(cookieParser());


let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri('mongodb://localhost:27017/levcoin_db');
    } catch (err) {
        console.log("Error connecting to DB: " + err);
    }
})();


const oneDay = 1000 * 60 * 60 * 24;
var sessionMiddleware = sessions({
    secret: "thisismysecrctekey_vjkfnvjksfnvsd17!",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: true,
})

app.use(sessionMiddleware)

require("./users/users_model")(db)
require("./levcoin/lecoin_model")(db)

module.exports = model => db.model(model);

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var users = require('./users/users_controller.js');
app.use('/users', sessionMiddleware, users);


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.redirect('main/page');
})

