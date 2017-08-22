window.fbAsyncInit = function() {
    FB.init({
        appId      : '1931085793774089',
        xfbml      : true,
        version    : 'v2.10'
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

/**
 * Check the fb login status upon app start
 */
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

/**
 * Callback for fb sdk call.
 * This will render events as markers on the map.
 * @param response
 */
function statusChangeCallback(response){
    console.log(response);
    // TODO: Do some animation here.
    alert("logging your events...")
    FB.api('/me/events', function(response) {
        for (let event of response.data){
            if (event.place.location) {
                new google.maps.Marker({
                    position: {lat: event.place.location.latitude, lng: event.place.location.longitude},
                    map: map
                });
            }
        }
    });
}

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

 
