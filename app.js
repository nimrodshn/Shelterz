var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var obj = 0;

var options = {
  host: 'maps.googleapis.com',
  path: '/maps/api/directions/json?origin=' + '' + '&destination=' + '' + 'l&avoid=highways&mode=bicycling'
}

function parseShelterzDB(){
  // Parsing JSON.
  fs.readFileSync('db/kml.json', 'utf8', function(err, data){
    if (err) throw err();
    else{
      // Parse default list of shelterz
      obj = JSON.parse(data);
    }
  });
}

app.get('/', function (req, res) {
  res.sendFile(path.join(
    __dirname, 'client', 'index.html'));
});

app.post('/', function(req, res){
  // post current location for calcualtions agains db list.
  // req params are latitude and longitude
  // compute the shortest distance using Google Maps API and report back the results.
  // should probably show the actoual route using google maps api.

});

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
   // parse default db once upon init.
   parseShelterzDB();
});
