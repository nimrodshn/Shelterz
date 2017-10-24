'use strict';
let loginOpen = false;

class Menu {
  constructor(elem){
    elem.addEventListener("click",this.onClick.bind(this));
    this._client = new hangoutClient();
  }

  addHangout() {
    let url = "api/add_hangout/lat/" + userPosition.lat + "/lng/" + userPosition.lng + "/source/hangouts";
    this._client.makeApiCall(url,"post");
  }

  findSpecificHangout() {
    alert('finding..');
  }

  closestHangout() {
    if (userPosition){
      let url = 'api/find_closest_hangout/lat/' + userPosition.lat + '/lng/' + userPosition.lng // userPosition is defined in map.js as a global variable.
      this._client.makeApiCall(url, "get", closest_shelter => {
        new google.maps.Marker({
          position: {lat: parseFloat(closest_shelter.lat), lng: parseFloat(closest_shelter.lng)},
          map: map
        });
      })
     }
    else{
      alert('user position is not defined!.');
    }
  }

  onClick(event){
    let action = event.target.dataset.action;
      if (action) {
        this[action]();
    }
  }
}

let menu = new Menu(document.getElementById('menu'));
