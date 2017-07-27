let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});


let sheltersSchema = mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number
})
