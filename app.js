"use strict";
const express = require('express');
const app = express();
const path = require('path');

/** Controllers:
 */
const hangoutController = require('./controllers/hangoutController.js')

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

app.get('/js/hangoutClient.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'hangoutClient.js'));
});

app.get('/filter_hangouts_by_distance/lat/:lat/lng/:lng/distance/:distance', hangoutController.filterHangoutsByDistance)
app.get('/find_closest_hangout/lat/:lat/lng/:lng', hangoutController.findClosestHangout);
app.post('/find_specific_hangout/lat/:lat/lng/:lng', hangoutController.findSpecificHangout);
app.post('/add_hangout/lat/:lat/lng/:lng/fb/:fb', hangoutController.addHangout);
app.post('/remove_hangout/lat/:lat/lng/:lng', hangoutController.removeHangout)

let server = app.listen(process.env.PORT || 8080, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
