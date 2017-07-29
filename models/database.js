const pg = require('pg');
const fs = require('fs');
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/shelterz';

const client = new pg.Client(connectionString);
client.connect();
// initiate db table
client.query('CREATE TABLE shelters(id SERIAL PRIMARY KEY, lat numeric NOT NULL, lon numeric NOT NULL)');

function parseShelterz(){
  // Should be in a different file?
  // Should be pushed to db .
  // Parsing JSON.
  db = fs.readFileSync('db/kml.json', 'utf8');
  return JSON.parse(db)["features"];
}

function inputShelterz(){
  let list_of_shelters = parseShelterz();
  for (let i=0;i<list_of_shelters.length;i++){
    let lat = list_of_shelters[i]['geometry']['coordinates'][0];
    let lon = list_of_shelters[i]['geometry']['coordinates'][1];
    const text = 'INSERT INTO shelters(lat,lon) VALUES($1,$2)';
    let values = [lat, lon];
    client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
    });
  }
}

// input shelterz to db
inputShelterz();
