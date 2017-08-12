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

app.post('/find_event/lat/:lat/lon/:lon', shelterzController.findEvent);
app.post('/add_event/lat/:lat/lon/:lon', shelterzController.addEvent);
app.post('/remove_event/lat/:lat/lon/:lon', shelterzController.removeEvent)

var server = app.listen(process.env.PORT || 8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
   // parse default db once upon init.
});
