var express = require('express');
var bodyParser = require('body-parser');
var riot = require('riot-games-api-nodejs/lib/riot-games-api-nodejs.js');
riot.settings = {
        region: 'na',
        global: 'global'
      }
riot.developerKey = 'RGAPI-057A4D72-7B90-437A-8118-5DE1FF4F4D3D'
var app = express();

var champions = [];

//push all champions into an array
riot.staticData.champions(
    {},
    function(err, data) {
      for(var key in data) {
        champions.push(data[key])
      }
    }
);

app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.use(bodyParser.json());
//sets folder /public to be used on redirect
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/lookup', function(req, res) {
  console.log('poop')
  res.sendFile(__dirname + '/public/lookup.html');
})

app.post('/search', function(req, res, next) {
  var summName = req.body.name;
  var id;
  riot.summoner.byName(
    summName, //or 'Dyrus,I DIED TO WOLVES,InsertSmurfHere'
    {},
    function(err, data) {
      id = data[summName].id;
      console.log('INSIDE BYNAME', id)
      riot.stats.ranked(
        id,
        {
        season : 'SEASON2016'
        },
        function(err, data) {
          console.log('Champion data: ', champions)
          console.log('Summoner data: ',data)
          res.status(200).json(data);
        }
      )
    }
  );

})

app.listen(app.get('port'), function() {
  console.log('Listening on port', app.get('port'))
})




module.exports = app;
