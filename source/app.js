function resetPage() {
  location.reload();
}

//setInterval();

function myLocation(zone) {
  if (zone) {
    let myZone = document.querySelector("#show-my-location");
    let myFlag = document.querySelector("#my-flag");
    let myTime = document.querySelector("#show-my-time");
    let myDate = document.querySelector("#show-my-date");
    let myCountry = myCountryLocation.replace(/\s/g, "").split("");
    let myCountryWord = myCountry.join("");
    myTime.innerHTML = moment().tz(`${zone}`).format("h:mm:ss a");
    myDate.innerHTML = moment().tz(`${zone}`).format("dddd, MMMM D, YYYY");
    myZone.innerHTML = myCityLocation;
    myFlag.innerHTML = "";
    myFlag.src = `images/${myCountryWord}.png`;
  }
}

function updateCity(event) {}

// function showCurrentDate(event) {
//   let selectedOption = event.target.options[event.target.selectedIndex];
//   let currentDate = "";
//   if (event.target.value === "my-location") {
//     resetPage();
//   } else if (event.target.value === "paris") {
//     currentDate = moment()
//       .tz("Europe/Paris")
//       .format("dddd, MMMM D, YYYY h:mm A");
//   } else if (event.target.value === "tokyo") {
//     currentDate = moment().tz("Asia/Tokyo").format("dddd, MMMM D, YYYY h:mm A");
//   } else if (event.target.value === "sydney") {
//     currentDate = moment()
//       .tz("Australia/Sydney")
//       .format("dddd, MMMM D, YYYY h:mm A");
//   } else if (event.target.value === "london") {
//     currentDate = moment()
//       .tz("Europe/London")
//       .format("dddd, MMMM D, YYYY h:mm A");
//   } else if (event.target.value === "new-york") {
//     currentDate = moment()
//       .tz("America/New York")
//       .format("dddd, MMMM D, YYYY h:mm A");
//   }

//   let dateElement = document.querySelector("#display-country");
//   if (event.target.value === "my-location") {
//     dataElement.innerHTML = "";
//   }
//   dateElement.innerHTML = currentDate;
// }

myCityLocation = null;
myStateLocation = null;
myCountryLocation = null;

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
          myCityLocation = data.city;
          myStateLocation = data.state_prov;
          myCountryLocation = data.country_name;
          if (zoneName !== null) {
            myLocation(zoneName);
            console.log(zoneName);
          } else {
            // Handle undefined zone name
            let defaultLocation = "America/New_York";
            myLocation(defaultLocation);
          }
        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
          let defaultLocation = "America/New_York";
          myLocation(defaultLocation);
        });
    },
    function (error) {
      // Handle geolocation error
      console.log("Geolocation error:", error);
      let defaultLocation = "America/New_York";
      myLocation(defaultLocation);
    }
  );
} else {
  // Geolocation API is not supported
  console.log("Geolocation API is not supported");
  let defaultLocation = "America/New_York";
  myLocation(defaultLocation);
}

updateTime();
setInterval(updateTime, 1000);

let countrySelect = document.querySelector("#select-country");
countrySelect.addEventListener("change", updateCity);
