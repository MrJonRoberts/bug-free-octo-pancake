console.log("Loaded");
// set the token
let access_token = "pk.eyJ1IjoibXJqb25yb2JlcnRzIiwiYSI6ImNsNm4zb205YzBycmYzcG1tcjVqYnhnbTkifQ.LIoSKBzTZkH-X-TX3Lu6nw"

// set a default location - this is the center of the map - set to Cairns.
var latitude = -16.925491;
var longitude = 145.754120;
position = {coords: {latitude: latitude, longitude: longitude} };
// set the token in mapbox
mapboxgl.accessToken = access_token;

// get locations
/*
if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                },
                error => {
                    console.log("Error: ", error)
                },{ enableHighAccuracy: true });
}
 */

function getLocation(){
    if (navigator.geolocation) {
        // if we can get the locations then we call the show positions function
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        // navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });



    } else {
        console.log("Geolocation is not supported by this browser.");
        // call showposition with the default location
        showPosition(position );
    }
}
// a function to create custom marker
function createCustomMarker(type) {
    // set type to default if it is not set
    type = type || 'default';
    var imgsrc = "/static/pin.png";

    // if the image is not default set the image to the type
    if (type !== 'default') {
        imgsrc = "/static/"+type + ".png";
    }
    // create the image
    var img = document.createElement('img');
    img.src = imgsrc;

}

// show the position
function showPosition(position){
    // set the position based on the position data
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // output for debugging
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);

    // create the map
    var map = new mapboxgl.Map({

        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 7


    });

    for (var i = 0; i < markers.length; i++){
        // document.write("<br><br>array index: " + i);
        var mark = markers[i];
        lat = mark['latitude'];
        long = mark['longitude'];
        desc = mark['description'];
  //       add the markers.
  //   // this would be done for each of the markers set in the map.html script block.
    var marker = new mapboxgl.Marker({
        element: createCustomMarker()})
        .setLngLat([long, lat])
        .addTo(map);
    // add the popup for the marker.
    var popup = new mapboxgl.Popup({ closeOnClick: false }) // Keep the popup open until explicitly closed
    //.setHTML("<h3>Hello, this is a popup!</h3>");

  // Add the popup to the marker
    marker.setPopup(popup);
    var popupContent = "<h3>Sighting</h3>" +desc;
                   // markers[0].description
    popup.setHTML(popupContent);
    marker.on('click', function() {
        popup.addTo(map);
    });
    // Close the popup when you click the map.
    popup.on('close', function() {
    // Handle the 'close' event here, if needed
    });

    }
  //   // add the markers.
  //   // this would be done for each of the markers set in the map.html script block.
  //   var marker = new mapboxgl.Marker({
  //       element: createCustomMarker()})
  //       .setLngLat([markers[0].longitude, markers[0].latitude])
  //       .addTo(map);
  //   // add the popup for the marker.
  //   var popup = new mapboxgl.Popup({ closeOnClick: false }) // Keep the popup open until explicitly closed
  //   .setHTML("<h3>Hello, this is a popup!</h3>");
  //
  // // Add the popup to the marker
  //   marker.setPopup(popup);
  //   var popupContent = "<h3>Sighting</h3>" +
  //                  markers[0].description
  //   popup.setHTML(popupContent);
  //   marker.on('click', function() {
  //       popup.addTo(map);
  //   });
  //   // Close the popup when you click the map.
  //   popup.on('close', function() {
  //   // Handle the 'close' event here, if needed
  //   });

}
function showError(e){
    console.log("Error" + e.code + ": " + e.message);
    showPosition(position)
}

window.onload = getLocation;