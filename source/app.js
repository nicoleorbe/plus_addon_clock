function resetPage() {
  location.reload();
}

function search(zone) {
  if (zone) {
    let newZone = document.querySelector("#display-country");
    console.log(zone);
    getDate = moment().tz(`${zone}`).format("dddd, MMMM D, YYYY h:mm A");
    newZone.innerHTML = `It is ${getDate} in ${myLocation}`;

    //dateElement.innerHTML = `It is ${currentDate} in ${selectedOption.textContent}`;
  }
}

function showCurrentDate(event) {
  let selectedOption = event.target.options[event.target.selectedIndex];
  let currentDate = "";
  if (event.target.value === "my-location") {
    resetPage();
  } else if (event.target.value === "paris") {
    currentDate = moment()
      .tz("Europe/Paris")
      .format("dddd,MMMM D, YYYY h:mm A");
  } else if (event.target.value === "tokyo") {
    currentDate = moment().tz("Asia/Tokyo").format("dddd, MMMM D, YYYY h:mm A");
  } else if (event.target.value === "sydney") {
    currentDate = moment()
      .tz("Australia/Sydney")
      .format("dddd, MMMM D, YYYY h:mm A");
  }

  let dateElement = document.querySelector("#display-country");
  dateElement.innerHTML = `It is ${currentDate} in ${selectedOption.textContent}`;
}

let countrySelect = document.querySelector("#select-country");
countrySelect.addEventListener("change", showCurrentDate);

myLocation = null;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      console.log(latitude);
      console.log(longitude);
      let geoAPIKey = "e9d4cfe75eda49729ab3361d039e85a9";
      fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${geoAPIKey}`)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(function (data) {
          let zoneName = data.time_zone.name;
          myLocation = data.city;
          if (zoneName !== null) {
            search(zoneName);
            console.log(zoneName);
          } else {
            // Handle undefined zone name
            let defaultLocation = "America/New_York";
            search(defaultLocation);
          }
        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
          let defaultLocation = "America/New_York";
          search(defaultLocation);
        });
    },
    function (error) {
      // Handle geolocation error
      console.log("Geolocation error:", error);
      let defaultLocation = "America/New_York";
      search(defaultLocation);
    }
  );
} else {
  // Geolocation API is not supported
  console.log("Geolocation API is not supported");
  let defaultLocation = "America/New_York";
  search(defaultLocation);
}

//https://maps.googleapis.com/maps/api/timezone/json?location=33.7615993%2C-96.5902336&key=AIzaSyC1wF-QTYLNhuk0nRvNj0S_cEsPiMkN0bI
//https://api.ipgeolocation.io/ipgeo?apiKey=e9d4cfe75eda49729ab3361d039e85a9

//console.log(moment.tz.zonesForCountry("US"));
