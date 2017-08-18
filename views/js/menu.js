'use strict';

let loginOpen = false;

class Menu {
  constructor(elem){
    this._elem = elem;
    elem.addEventListener("click",this.onClick.bind(this));
  }

  addEvent() {
    alert('adding..');
  }

  findSpecificEvent() {
    alert('finding..');
  }

  closestEvent() {
    if (userPosition){
      alert('looking for position....');
      let url = 'find_closest_event/lat/' + userPosition.lat + '/lng/' + userPosition.lng // userPosition is defined in map.js as a global variable.
      fetch(url).then(function(response){
        return response.json();
      }).then(function(closest_event) {
        console.log(closest_event);
        let marker = new google.maps.Marker({
          position: {lat: parseFloat(closest_event.lat), lng: parseFloat(closest_event.lng)},
          map: map
        });
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

new Menu(document.getElementById('menu'));
