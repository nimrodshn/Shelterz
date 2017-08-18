let map, infoWindow, userPosition, addingShelter;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
  });

  google.maps.event.addListener(map, "click", function(event){
    addMarker(event.latLng)
  });

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let marker = new google.maps.Marker({
          position: userPosition,
          map: map
        });
        map.setCenter(userPosition);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function addMarker(position){
  if (!addingShelter) {
    let marker = new google.maps.Marker({
        position: position,
        map: map
    });
    infoWindow = new google.maps.InfoWindow({
      content: '<p> would you like to add a shelter here? </p>' +
                '<button onclick=addShelterFromMapClick(this)>Let\'s hangout!</button>'
    });
    infoWindow.open(map, marker);
    addingShelter = true;
    google.maps.event.addListener(marker, "rightclick", function(event){
        addingShelter = false;
        marker.setMap(null);
    });
  }
}

function addShelterFromMapClick(event) {
  url = "/add_shelter/lat/" + infoWindow.getPosition().lat() + "/lng/" + infoWindow.getPosition().lng();
  postAddShelter(url);
}

function postAddShelter(url){
  // connect to db
  alert("adding new shelter!");
}
