var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var list_of_shelters = 0;

var options = {
  host: 'maps.googleapis.com',
  path: '/maps/api/directions/json?origin=' + '' + '&destination=' + '' + 'l&avoid=highways&mode=bicycling'
}

function parseShelterz(){
  // Parsing JSON.
  db = fs.readFileSync('db/kml.json', 'utf8');
  return JSON.parse(db)["features"];
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.post('/lat/:lat/lan/:lan', function (req, res){
  for (var shelter in list_of_shelters){
    // compute distance here using users latitude and lan.
    // display the best location to the user.
  }
});

var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
   list_of_shelters = parseShelterz();
   // parse default db once upon init.
});
