var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var obj = 0;

function parseShelterzDB(){
  // Parsing JSON.
  fs.readFileSync('db/kml.geojson', 'utf8', function(err, data){
    if (err) throw err();
    else{
      // Parse default list of shelterz
      obj = JSON.parse(data);
      console.log(obj);
      console.log("lfksjdlkfjds");
    }
  });
}

app.get('/', function (req, res) {
  // req params are latitude and longitude
  // compute the shortest distance using Google Maps API and report back the results.
  // should probably show the actoual route using google maps api.
  parseShelterzDB();
  res.sendFile(path.join(
    __dirname, 'client', 'index.html'));
});


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

});
