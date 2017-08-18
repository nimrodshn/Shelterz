let map, infoWindow, userPosition;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();

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
