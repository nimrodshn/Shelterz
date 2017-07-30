"use strict";
const fs = require('fs');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/shelterz';

const client = new pg.Client(connectionString);
client.connect();

/* Calculate the distance between two points given in lat / lon coordinates using the 'Haversine' formula.
*/
function calculateDistance(lat1,lon1,lat2,lon2){
  let p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 - c((lat2 - lat1) * p)/2 +
         c(lat1 * p) * c(lat2 * p) *
         (1 - c((lon2 - lon1) * p))/2;
 return 12742 * Math.asin(Math.sqrt(a));
}

/* Compute the closest shelter to the location given by lat and lan.
*/
function computeMinimalDistance(lat,lon, cb){
  const query = {text:"SELECT * FROM shelters", rowMode : 'array'};
  console.log('got here with lat : ' + lat + " lon : " + lon);
  let result = {};
  client.query(query, (err,res) => {
    if (err){
      console.log(err);
    }
    else{
      let list_of_shelters = res.rows;
      let min_distance = calculateDistance(list_of_shelters[0][1],list_of_shelters[0][2],lat,lon);
      let closest_shelter = {};
      for (let i=0;i<list_of_shelters.length;i++){
        let curr_distance = calculateDistance(list_of_shelters[i][1],list_of_shelters[i][2],lat,lon);
        if (curr_distance < min_distance) {
          min_distance = curr_distance;
          closest_shelter['lat'] = list_of_shelters[i][1];
          closest_shelter['lon'] = list_of_shelters[i][2];
        }
      }
      // debug
      // console.log(closest_shelter);
      cb(closest_shelter)
    }
  });
}

exports.postShelter = (req,res) => {
  computeMinimalDistance(req.params['lat'],req.params['lon'], function(closest_shelter){
    res.send(closest_shelter);
  });
}
