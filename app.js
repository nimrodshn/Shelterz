"use strict";
const express = require('express');
const http = require('https');
const app = express();
const path = require('path');

/** Controllers:
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

app.get('/find_closest_event/lat/:lat/lng/:lng', shelterzController.findClosestEvent);
app.post('/find_specific_event/lat/:lat/lng/:lng', shelterzController.findSpecificEvent);
app.post('/add_event/lat/:lat/lng/:lng', shelterzController.addEvent);
app.post('/remove_event/lat/:lat/lng/:lng', shelterzController.removeEvent)

var server = app.listen(process.env.PORT || 8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
   // parse default db once upon init.
});
