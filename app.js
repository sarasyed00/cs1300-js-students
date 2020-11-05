var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=eLlmherxoKom7qouj5hbucu0Udy0Hh2y7hR3b1QYU_U";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

const addToGrid = (plantData) => {
    const plantProfile = document.createElement('div');
    const plantName = document.createElement('h3');
    plantName.innerHTML = "name: " + plantData.common_name;
    const plantGenus = document.createElement('h3');
    plantGenus.innerText = "genus: " + plantData.genus;
    const plant_img = document.createElement('img');
    plant_img.setAttribute('src', plantData.image_url);

    plantProfile.appendChild(plantName);
    plantProfile.appendChild(plantGenus);
    plantProfile.appendChild(plant_img);

    document.getElementById("plant-grid").appendChild(plantProfile);
}

const loadPlants = (plantData) => {

    plantData.map(addToGrid)
}

const show_on_button_click = () => {
    corsPromise().then(
      (request) =>
        (request.onload = request.onerror = function () {
          // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
          const plantData = JSON.parse(request.response).data;
          //updateGrid(plantData);
          loadPlants(plantData)
        })
    );
}
//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
