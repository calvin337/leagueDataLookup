var express = require('express');
var bodyParser = require('body-parser');
// var riot = require('riot-games-api-nodejs');
var app = express();

app.use(bodyParser.json());


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Listening on port', app.get('port'))
})

app.get('/', function(req, res, next){
  res.send("INDEX PAGE");
});


module.exports = app;
