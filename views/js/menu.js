'use strict';
let loginOpen = false;

class Menu {
  constructor(elem){
    this._elem = elem;
    elem.addEventListener("click",this.onClick.bind(this));
    this._client = new shelterzClient();
  }

  addShelter() {
    let fb = "false";
    let url = "/add_shelter/lat/" + userPosition.lat + "/lng/" + userPosition.lng + "/fb/" + fb;
    this._client.makeApiCall(url,"post");
  }

  findSpecificShelter() {
    alert('finding..');
  }

  closestShelter() {
    if (userPosition){
      alert('looking for position....');
      let url = 'find_closest_shelter/lat/' + userPosition.lat + '/lng/' + userPosition.lng // userPosition is defined in map.js as a global variable.
      this._client.makeApiCall(url, "get", closest_shelter => {console.log(closest_shelter);
              let marker = new google.maps.Marker({
                position: {lat: parseFloat(closest_shelter.lat), lng: parseFloat(closest_shelter.lng)},
                map: map
              });})
     }
    else{
      alert('user position is not defined!.');
    }
  }

  login(){
      let menu = document.getElementById("menu");
      if (!loginOpen){
        menu.style.height = '150px';
        loginOpen = true;
      } else {
        menu.style.height = '20px';
        loginOpen = false
      }
  }

  // onclick Menu Event Handler
  onClick(event){
    let action = event.target.dataset.action;
      if (action) {
        this[action]();
    }
  }
}

let menu = new Menu(document.getElementById('menu'));
