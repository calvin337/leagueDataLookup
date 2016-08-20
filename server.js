var express = require('express');
var bodyParser = require('body-parser');
var riot = require('riot-games-api-nodejs');
var app = express();

app.use(bodyParser.json());


app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res, next){
  res.send("INDEX PAGE");
});

module.exports = app;
