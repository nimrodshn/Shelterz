"use strict";

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/hangouts';

exports.findClosestHangout = (req,res) => {
    const query = {text:"SELECT * FROM hangouts", rowMode : 'array'};
    queryDatabase(query, function(query_result) {
        if (query_result.rows.length > 0){
            let points_array = query_result.rows.map(function(row) {
                return {lat:row[1], lng:row[2]};
            });
            let closest_hangout = findClosestEntry(points_array, calculateHaversineDistance, req.params);
            res.send(closest_hangout);
        } else {
            console.log("No events found near you in DB!");
            res.send(null);
        }
    });
}

exports.addHangout = (req,res) => {
    const query = {text:"INSERT INTO hangouts (lat, lng , source) VALUES (" + req.params.lat + "," + req.params.lng + ",'" + req.params.source + "')", rowMode : 'array'};
    queryDatabase(query);
    res.send(req.params);
}

exports.removeHangout = (req,res) => {
    const query = {text:"DELETE FROM hangouts where lat = " + req.params.lat + " AND lng = " + req.params.lng , rowMode : 'array'};
    queryDatabase(query);
    res.send(req.params);
}

exports.getHangout = (req,res) => {
    // TODO: implements this.
    findSpecificHangoutHelper(req.params, function(hangout) {
        res.send(hangout);
    });
}

exports.filterHangoutsByDistance = (req,res) => {
    const query = {text:"SELECT * FROM hangouts", rowMode : 'array'};
    queryDatabase(query, function(query_result){
        if (query_result.rows.length > 0){
            let hangouts_array = query_result.rows.map(function(row) {
                return {lat:row[1], lng:row[2]};
            });
            let result = hangouts_array.filter(function(hangout) {
                return calculateHaversineDistance(hangout ,{lat: req.params.lat, lng: req.params.lng}) <= parseInt(req.params.distance);
            });
            res.send(result);
        } else {
            console.log("No events found near you in DB!");
            res.send(null);
        }
    });
}

/**
 *  Calculate the distance between two points given in lat / lng coordinates using the 'Haversine' formula.
 * @param p1
 * @param p2
 * @returns {number}
 */
function calculateHaversineDistance(p1,p2){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((p1.lat - p2.lat) * p)/2 +
        c(p1.lat * p) * c(p2.lat * p) *
        (1 - c((p1.lng - p1.lng) * p))/2;
    return 12742 * Math.asin(Math.sqrt(a)) * 1000; // distance in meters.
}

/**
 * Finds the closest entry in array arr with respect to a given metric and current location (Brute force algorithm).
 * @param arr
 * @param metric
 * @param current_location
 * @returns minimal entry as {lat: *, lng: *}
 */
function findClosestEntry(arr, metric, location) {
    let min_distance = metric(arr[0],location);
    let res = {lat:arr[0].lat, lng: arr[0].lng};
    for (let i=0;i<arr.length;i++){
        let curr_distance = metric(arr[i],location);
        if (curr_distance < min_distance) {
            min_distance = curr_distance;
            res.lat = arr[i].lat;
            res.lng = arr[i].lng;
        }
    }
    return res;
}

/**
 * Wrapper for querying the database. The results are then passed to a callback which process/filters them.
 * @param query
 * @param process_results_callback
 */
function queryDatabase(query, process_results_callback) {
    const client = new pg.Client(connectionString);
    client.connect();

    console.log("DEBUG: Passing query to database " + query.text );
    client.query(query, (err, query_result) => {
        if (err) {
            console.log(err);
        } else {
            process_results_callback(query_result);
        }
    });
}