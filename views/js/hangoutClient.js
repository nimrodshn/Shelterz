class hangoutClient {
    makeApiCall(url, verb, callback=null) {
        console.log(url); // debug
        fetch(url, {method: verb}).then(function (response) {
            alert("succesfuly made a " + verb + " request to shelter server!");
            if (infoWindow) {
                infoWindow.close()
            }
            return response.json();
        }).then(function (data){
            if (callback){
                callback(data)
            }
        }).catch(function (err){
            alert("something bad happend...");
        });
    }
}