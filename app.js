"use strict";
const express = require('express');
const http = require('https');
const app = express();
const path = require('path');

/**  Import Controllers
*/
const shelterzController = require('./controllers/shelterzController.js')

/** Routes
*/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/css/styles.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'css', 'styles.css'));
});

app.get('/js/map.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'js', 'map.js'));
});

app.get('/js/menu.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'js', 'menu.js'));
});

app.get('/js/fb.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'js', 'fb.js'));
});

app.get('/js/shelterzClient.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'shelterzClient.js'));
});

app.get('/find_closest_shelter/lat/:lat/lng/:lng', shelterzController.findClosestShelter);
app.post('/find_specific_shelter/lat/:lat/lng/:lng', shelterzController.findSpecificShelter);
app.post('/add_shelter/lat/:lat/lng/:lng/fb/:fb', shelterzController.addShelter);
app.post('/remove_shelter/lat/:lat/lng/:lng', shelterzController.removeShelter)

var server = app.listen(process.env.PORT || 8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
   // parse default db once upon init.
});
