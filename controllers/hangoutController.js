"use strict";

const hangoutHelpers = require('../helpers/hangoutHelpers.js');

exports.filterHangoutsByDistance = (req,res) => {
  hangoutHelpers.filterHangoutsByDistanceHelper(req.params, function(hangouts_list){
    res.send(hangouts_list);
  });
}

exports.findClosestHangout = (req,res) => {
  hangoutHelpers.computeMinimalDistanceEntry(req.params, function(closest_hangout) {
    res.send(closest_hangout);
  });
}

exports.addHangout = (req,res) => {
  hangoutHelpers.addHangoutHelper(req.params, function(new_hangout){
    res.send(new_hangout);
  });
}

exports.removeHangout = (req,res) => {
  hangoutHelpers.removeHangoutHelper(req.params, function(hangout_to_remove){
    res.send(hangout_to_remove);
  });
}

exports.findSpecificHangout = (req,res) => {
  // TODO: implements this.
  findSpecificHangoutHelper(req.params, function(hangout) {
    res.send(hangout);
  });
}

