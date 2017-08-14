'use strict';

class Menu {
  constructor(elem){
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
  }

  addEvent() {
    alert('adding..');
  }

  findSpecificEvent() {
    alert('finding..');
  }

  closestEvent() {
    alert('searching closest event..');
    let url = 'find_closest_event/lat/' + pos.lat + '/lng/' + pos.lng
    console.log(url);
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
    }).catch(function() {
      console.log("Booo");
    });
  }

  onClick(event){
    let action = event.target.dataset.action;
      if (action) {
        this[action]();
    }
  }
}

let menu = document.getElementById('menu');
new Menu(menu);
