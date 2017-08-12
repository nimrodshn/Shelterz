"use strict";
const fs = require('fs');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/shelterz';

const client = new pg.Client(connectionString);
client.connect();

// Controllers

exports.findEvent = (req,res) => {
  computeMinimalDistanceEntry(req.params, function(closest_shelter){
    res.send(closest_shelter);
  });
}

exports.addEvent = (req,res) => {
  addShelter(req.params, function(){
    res.send(req.params);
  });
}

exports.removeEvent = (req,res) => {
  removeShelter(req.params, function(){
    res.send(req.params);
  });
}

// Helper Methods

function removeShelter(shelter_to_remove, callback){
  const query = {text:"DELETE FROM shelters  where lat = " + shelter_to_remove['lat'] + " AND lon = " + shelter_to_remove['lon'] , rowMode : 'array'};
  console.log('got here with lat : ' + shelter_to_remove['lat'] + " lon : " + shelter_to_remove['lon']);
  let result = {};
  client.query(query, (err,res) => {
    if (err){
      console.log(err);
    }
    else{
      callback(closest_shelter);
    }
  });
}

function addShelter(new_shelter, callback){
  const query = {text:"INSERT INTO shelters (lat, lon) VALUES (" + new_shelter['lat'] +  new_shelter['lon'] + ")", rowMode : 'array'};
  console.log('got here with lat : ' + new_shelter['lat'] + " lon : " + new_shelter['lon']);
  let result = {};
  client.query(query, (err,res) => {
    if (err){
      console.log(err);
    }
    else{
      callback(closest_shelter);
    }
  });
}

/* Calculate the distance between two points given in lat / lon coordinates using the 'Haversine' formula.
*/
function calculateDistance(p1,p2){
  let p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 - c((p1.lat - p2.lat) * p)/2 +
         c(p1.lat * p) * c(p2.lat * p) *
         (1 - c((p1.lon - p1.lon) * p))/2;
 return 12742 * Math.asin(Math.sqrt(a));
}

/* Compute the closest shelter to the location given by lat and lan.
*/
function computeMinimalDistanceEntry(current_location, callback){
  const query = {text:"SELECT * FROM shelters", rowMode : 'array'};
  console.log('got here with lat : ' + current_location['lat'] + " lon : " + current_location['lon']);
  let result = {};
  client.query(query, (err,res) => {
    if (err){
      console.log(err);
    }
    else{
      let points_array = res.rows.map(function(row) {
        return {lat:row[1], lon:row[2]};
      });
      let closest_shelter = findMinimalEntry(points_array, calculateDistance, current_location);
      callback(closest_shelter);
    }
  });
}

function findMinimalEntry(arr, metric, current_location) {
  let min_distance = metric(arr[0],current_location);
  let closest_shelter = {};
  for (let i=0;i<arr.length;i++){
    let curr_distance = metric(arr[i],current_location);
    if (curr_distance < min_distance) {
      min_distance = curr_distance;
      closest_shelter.lat = arr[i].lat;
      closest_shelter.lon = arr[i].lon;
    }
  }
  return closest_shelter;
}
