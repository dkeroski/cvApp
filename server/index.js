var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hr-portfolio');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var everything = require('./routes.js')(app);

var server = app.listen(3000,function() {
  console.log("App listen on port 3000");
})
console.log("Server start");