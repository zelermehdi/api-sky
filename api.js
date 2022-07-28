//Clé d'authentification pour se connecter à l'API
let latitude;
let longitude;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  document.getElementById("demo").innerHTML =
    "Geolocation is not supported by this browser.";
}
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => sky(data, latitude, longitude));
}

function sky(data, latitude, longitude) {
  let tableData = "";
  let tabHtml = document.querySelector("#tabprod");
  let states = data.states;
  console.log(states.length);
  states.forEach((avion) => {
    let latitudeAvion = avion[6];
    let longitudeAvion = avion[5];
    let calcule = distance(latitude, latitudeAvion, longitude, longitudeAvion);

    // console.log(calcule)
    if (calcule < 500) {
      console.log(avion);
      tableData += `<tr>
     <td>${avion[2]}</td>
     <td>${avion[0]}</td>
    <td>${avion[1]}</td>
    <td>${avion[15]}</td>
     <td></td>
    </tr>`;
    }
  });
  tabHtml.innerHTML = tableData;


}

// JavaScript program to calculate Distance Between
// Two Points on Earth

function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}
