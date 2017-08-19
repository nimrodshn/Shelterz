"use strict";
const fs = require('fs');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/shelterz';

const client = new pg.Client(connectionString);
client.connect();

// Controllers

exports.findClosestShelter = (req,res) => {
  computeMinimalDistanceEntry(req.params, function(closest_event) {
    res.send(closest_event);
  });
}

exports.addShelter = (req,res) => {
  addShelterHelper(req.params, function(new_shelter){
    res.send(new_shelter);
  });
}

exports.removeShelter = (req,res) => {
  removeShelterHelper(req.params, function(shelter_to_remove){
    res.send(shelter_to_remove);
  });
}

exports.findSpecificShelter = (req,res) => {
  findSpecificShelterHelper(req.params, function(shelter) {
    res.send(shelter);
  });
}

// Helper Methods

function removeShelterHelper(shelter_to_remove, callback){
  const query = {text:"DELETE FROM shelters  where lat = " + shelter_to_remove.lat + " AND lng = " + shelter_to_remove.lng , rowMode : 'array'};
  console.log('got here with lat : ' + shelter_to_remove.lat + " lng : " + shelter_to_remove.lng);
  let result = {};
  client.query(query, (err,res) => {
    if (err){
      console.log(err);
    }
    else{
      callback(shelter_to_remove);
    }
  });
}

function addShelterHelper(new_shelter, callback){
  const query = {text:"INSERT INTO shelters (lat, lng , fb) VALUES (" + new_shelter.lat + "," + new_shelter.lng + "," +  new_shelter.fb + ")", rowMode : 'array'};
  console.log('query: ' + query.text);
  let result = {};
  client.query(query, (err,res) => {
    if (err){
      console.log(err);
    }
    else{
      callback(new_shelter);
    }
  });
}

/* Calculate the distance between two points given in lat / lng coordinates using the 'Haversine' formula.
*/
function calculateDistance(p1,p2){
  let p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 - c((p1.lat - p2.lat) * p)/2 +
         c(p1.lat * p) * c(p2.lat * p) *
         (1 - c((p1.lng - p1.lng) * p))/2;
 return 12742 * Math.asin(Math.sqrt(a));
}

/* Compute the closest shelter to the location given by lat and lan.
*/
function computeMinimalDistanceEntry(current_location, callback){
    const query = {text:"SELECT * FROM shelters", rowMode : 'array'};
    console.log('got here with lat : ' + current_location['lat'] + " lng : " + current_location['lng']);
    let result = {};
    client.query(query, (err,res) => {
      if (err){
        console.log(err);
      }
      else{
        if (res.rows.length > 0){
          let points_array = res.rows.map(function(row) {
            return {lat:row[1], lng:row[2]};
          });
          let closest_shelter = findMinimalEntry(points_array, calculateDistance, current_location);
          callback(closest_shelter);
        } else {
          console.log("No events found near you in DB!");
        }
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
      closest_shelter.lng = arr[i].lng;
    }
  }
  return closest_shelter;
}
