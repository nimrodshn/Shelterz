'use strict';

let loginOpen = false;

class Menu {
  constructor(elem){
    this._elem = elem;
    elem.addEventListener("click",this.onClick.bind(this));
  }

  addShelter() {
    alert('adding..');
  }

  findSpecificShelter() {
    alert('finding..');
  }

  closestShelter() {
    if (userPosition){
      alert('looking for position....');
      let url = 'find_closest_shelter/lat/' + userPosition.lat + '/lng/' + userPosition.lng // userPosition is defined in map.js as a global variable.
      fetch(url).then(function(response){
        return response.json();
      }).then(function(closest_shelter) {
        console.log(closest_shelter);
        let marker = new google.maps.Marker({
          position: {lat: parseFloat(closest_event.lat), lng: parseFloat(closest_event.lng)},
          map: map
        });
      }).catch(function(err) {
        alert(err);
      });
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
        menu.style.height = 'auto';
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
