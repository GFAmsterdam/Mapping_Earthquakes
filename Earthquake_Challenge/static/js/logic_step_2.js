//Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([40.7, -94.5], 4);

let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    titleSize: 512,
    zoomOffset: -1
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    titleSize: 512,
    zoomOffset: -1
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    titleSize: 512,
    zoomOffset: -1
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
    Satellite: satelliteStreets,
};

let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//let marker = L.circleMarker([34.0522, -118.2437]).addTo(map);

// Add GeoJSON data.
//let sanFranAirport =
//{
//"type": "FeatureCollection", "features": [{
//"type": "Feature",
//"properties": {
//"id": "3469",
//"name": "San Francisco International Airport",
//"city": "San Francisco",
//"country": "United States",
//"faa": "SFO",
//"icao": "KSFO",
// "alt": "13",
//"tz-offset": "-8",
//"dst": "A",
//"tz": "America/Los_Angeles"
//},
//"geometry": {
//"type": "Point",
// "coordinates": [-122.375, 37.61899948120117]
// }
// }
//]
//};

//pointToLayer example
//L.geoJson(data, {
//pointToLayer: function(feature, latlng) {
// return L.marker(latlng);
//}
//});

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport, {
//   pointToLayer: function (feature, latlng) {
//        return L.circleMarker(latlng)
//       .bindPopup("<h2>" + feature.properties.city + "</h2>");
//    }

//}).addTo(map);

//L.geoJSON(sanFranAirport, {
// onEachFeature: function (feature, layer) {
//     layer..bindPopup("<h2>" + feature.properties.city + "</h2>");
//  }
//}).addTo(map);

// Retrieve the earthquake GeoJSON data from USGS.
let earthquakeData = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    // Retreive the earthQuake GeoJSON data.
    d3.json(earthquakeData).then(function (data) {
        console.log(data);

        // This function returns the style data for each of the earthquakes we plot on
        // the map. We pass the magnitude of the earthquake into a function
        // to calculate the radius.
        function styleInfo(feature) {
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: "#ffae42",
                color: "#000000",
                radius: getRadius(),
                stroke: true,
                weight: 0.5
            };
        }

        // This function determines the radius of the earthquake marker based on its magnitude.
        // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
        function getRadius(magnitude) {
            if (magnitude === 0) {
                return 1;
            }
            return magnitude * 4;
        }


        // Creating a GeoJSON layer with the retrieved data.
        L.geoJSON(data, {

            // We turn each feature into a circleMarker on the map.

            pointToLayer: function (feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
            // We set the style for each circleMarker using our styleInfo function.
            style: styleInfo
        }).addTo(map);
        // no data beyond this point
    });




