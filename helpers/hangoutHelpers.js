"use strict"
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/hangouts';

const client = new pg.Client(connectionString);
client.connect();

/**
 * Filter my hangouts by distance.
 * @param distance
 * @param callback
 */
exports.filterHangoutsByDistanceHelper = function(params, callback){
    const query = {text:"SELECT * FROM hangouts", rowMode : 'array'};
    client.query(query, (err,res) => {
        if (err){
            console.log(err);
        }
        else{
            if (res.rows.length > 0){
                let hangouts_array = res.rows.map(function(row) {
                    return {lat:row[1], lng:row[2]};
                });
                let result = hangouts_array.filter(function(hangout) {
                   return calculateDistance(hangout ,{lat: params.lat, lng: params.lng}) <= parseInt(params.distance);
                });
                callback(result);
            } else {
                console.log("No events found near you in DB!");
            }
        }
    });
}

/**
 * Removes a hangout from database
 * @param hangout_to_remove
 * @param callback
 */
exports.removeHangoutHelper = function(hangout_to_remove, callback){
    const query = {text:"DELETE FROM hangouts where lat = " + hangout_to_remove.lat + " AND lng = " + hangout_to_remove.lng , rowMode : 'array'};
    console.log('got here with lat : ' + hangout_to_remove.lat + " lng : " + hangout_to_remove.lng);
    let result = {};
    client.query(query, (err,res) => {
        if (err){
            console.log(err);
        }
        else{
            callback(hangout_to_remove);
        }
    });
}

/**
 * Adds a new hangout to the database.
 * @param new_hangout
 * @param callback
 */
exports.addHangoutHelper = function(new_hangout, callback){
    const query = {text:"INSERT INTO hangouts (lat, lng , fb) VALUES (" + new_hangout.lat + "," + new_hangout.lng + "," +  new_hangout.fb + ")", rowMode : 'array'};
    console.log('query: ' + query.text);
    let result = {};
    client.query(query, (err,res) => {
        if (err){
            console.log(err);
        }
        else{
            callback(new_hangout);
        }
    });
}

/**
 * Compute the closest hangout to the current_location given by lat and lng.
 * @param current_location
 * @param callback
 */
exports.computeMinimalDistanceEntry = function(current_location, callback){
    const query = {text:"SELECT * FROM hangouts", rowMode : 'array'};
    console.log('got here with lat : ' + current_location['lat'] + " lng : " + current_location['lng']);
    client.query(query, (err,res) => {
        if (err){
            console.log(err);
        }
        else{
            if (res.rows.length > 0){
                let points_array = res.rows.map(function(row) {
                    return {lat:row[1], lng:row[2]};
                });
                let closest_hangout = findMinimalEntry(points_array, calculateDistance, current_location);
                callback(closest_hangout);
            } else {
                console.log("No events found near you in DB!");
            }
        }
    });
}

/**
 *  Calculate the distance between two points given in lat / lng coordinates using the 'Haversine' formula.
 * @param p1
 * @param p2
 * @returns {number}
 */
function calculateDistance(p1,p2){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((p1.lat - p2.lat) * p)/2 +
        c(p1.lat * p) * c(p2.lat * p) *
        (1 - c((p1.lng - p1.lng) * p))/2;
    return 12742 * Math.asin(Math.sqrt(a)) * 1000; // distance in meters.
}

function findMinimalEntry(arr, metric, current_location) {
    let min_distance = metric(arr[0],current_location);
    let res = {lat:arr[0].lat, lng: arr[0].lng};
    for (let i=0;i<arr.length;i++){
        let curr_distance = metric(arr[i],current_location);
        if (curr_distance < min_distance) {
            min_distance = curr_distance;
            res.lat = arr[i].lat;
            res.lng = arr[i].lng;
        }
    }
    return res;
}