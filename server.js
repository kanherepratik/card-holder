const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.json');

mongoose.connect(config.dbUrl);

app.use(bodyParser.json());

app.use('/game', require('./controller/game.controller.js'));

// serve static assets normally
app.use(express.static(__dirname + '/src'));


// Handles all routes so you do not get a not found error
app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)