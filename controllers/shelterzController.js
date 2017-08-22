"use strict";

const shelterHelpers = require('../helpers/shelterzHelpers');

exports.findClosestShelter = (req,res) => {
  shelterHelpers.computeMinimalDistanceEntry(req.params, function(closest_event) {
    res.send(closest_event);
  });
}

exports.addShelter = (req,res) => {
  shelterHelpers.addShelterHelper(req.params, function(new_shelter){
    res.send(new_shelter);
  });
}

exports.removeShelter = (req,res) => {
  shelterHelpers.removeShelterHelper(req.params, function(shelter_to_remove){
    res.send(shelter_to_remove);
  });
}

exports.findSpecificShelter = (req,res) => {
  // TODO: implements this.
  findSpecificShelterHelper(req.params, function(shelter) {
    res.send(shelter);
  });
}

