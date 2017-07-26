const fs = require('fs');

let list_of_shelters = 0;

function parseShelterz(){
  // Should be in a different file?
  // Should be pushed to db .
  // Parsing JSON.
  db = fs.readFileSync('db/kml.json', 'utf8');
  return JSON.parse(db)["features"];
}

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
function computeMinimalDistance(lat,lon){
  let min_distance = calculateDistance(list_of_shelters[0]['geometry']['coordinates'][0],list_of_shelters[0]['geometry']['coordinates'][1],lat,lon);
  let closest_shelter = {};
  for (let i=0;i<list_of_shelters.length;i++){
    let curr_distance = calculateDistance(list_of_shelters[i]['geometry']['coordinates'][0],list_of_shelters[i]['geometry']['coordinates'][1],lat,lon);
    if (curr_distance < min_distance) {
      min_distance = curr_distance;
      closest_shelter['lat'] = list_of_shelters[i]['geometry']['coordinates'][0];
      closest_shelter['lon'] = list_of_shelters[i]['geometry']['coordinates'][1];
    }
  }
  return closest_shelter;
}

exports.postShelter = (req,res) => {
  list_of_shelters = parseShelterz();
  let closest_shelter = computeMinimalDistance(req.params['lat'],req.params['lon']);
  res.send(closest_shelter);
}
