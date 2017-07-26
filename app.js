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
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.post('/lat/:lat/lon/:lon', shelterzController.postShelter);

var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
   // parse default db once upon init.
});
