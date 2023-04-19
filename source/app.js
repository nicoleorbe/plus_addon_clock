function updateTime() {
  //My Location
  let myElement = document.querySelector("#display-city");
  if (myElement) {
    let myDateElement = myElement.querySelector("#show-date");
    let myTimeElement = myElement.querySelector("#show-time");
    let zoneElement = myZone;
    let myTime = moment().tz(`${zoneElement}`);

    myDateElement.innerHTML = moment()
      .tz(`${zoneElement}`)
      .format("dddd, MMMM D, YYYY");
    myTimeElement.innerHTML = moment()
      .tz(`${zoneElement}`)
      .format("h:mm:ss [<small>]A[</small>]");

    let myHours = new Date(myTime).getHours();
    let footerColor = document.querySelector("#footer");

    if (
      (`${myHours}` >= 21 || `${myHours}` <= 4) &&
      footerColor.classList.contains("footer-dark") === false
    ) {
      gradient = "linear-gradient(to top, #09203f 0%, #537895 100%)";
      footerColor.classList.remove("footer");
      footerColor.classList.add("footer-dark"); //evening
    } else if (`${myHours}` >= 21 || `${myHours}` <= 4) {
      gradient = "linear-gradient(to top, #09203f 0%, #537895 100%)";
    } else if (`${myHours}` >= 5 && `${myHours}` <= 7) {
      gradient =
        "linear-gradient(75.2deg, rgb(41, 196, 255) -2.5%, rgb(255, 158, 211) 55%, rgb(255, 182, 138) 102.3%)"; //sunrise
    } else if (`${myHours}` >= 17 && `${myHours}` <= 20) {
      gradient =
        "linear-gradient(75.2deg, rgb(255, 182, 138) 2.5%, rgb(255, 158, 211) 44.8%, rgb(41, 196, 255) 102.3%)"; //sunset
    } else {
      gradient =
        "linear-gradient(109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)"; //daytime clear
    }
    //console.log(footerColor.classList.contains("footer-dark"));
    body.style.background = gradient;
  }

  let oneElement = document.querySelector("#display-location-one");
  if (oneElement) {
    let oneDateElement = oneElement.querySelector("#location-one-date");
    let oneTimeElement = oneElement.querySelector("#location-one-time");
    let oneLocationElement = oneElement.querySelector("#location-one");
    let oneTime = moment().tz("America/New_York");
    let oneImage = oneElement.querySelector("#location-one-flag");
    oneImage.src = "images/us.png";
    oneDateElement.innerHTML = oneTime.format("dddd, MMMM D, YYYY");
    oneTimeElement.innerHTML = oneTime.format("h:mm:ss [<small>]A[</small>]");
    oneLocationElement.innerHTML = "New York";
  }

  let twoElement = document.querySelector("#display-location-two");
  if (twoElement) {
    let twoDateElement = twoElement.querySelector("#location-two-date");
    let twoTimeElement = twoElement.querySelector("#location-two-time");
    let twoLocationElement = twoElement.querySelector("#location-two");
    let twoTime = moment().tz("Europe/London");
    let twoImage = twoElement.querySelector("#location-two-flag");
    twoImage.src = "images/gb.png";
    twoDateElement.innerHTML = twoTime.format("dddd, MMMM D, YYYY");
    twoTimeElement.innerHTML = twoTime.format("h:mm:ss [<small>]A[</small>]");
    twoLocationElement.innerHTML = "London";
  }

  let threeElement = document.querySelector("#display-location-three");
  if (threeElement) {
    let threeDateElement = threeElement.querySelector("#location-three-date");
    let threeTimeElement = threeElement.querySelector("#location-three-time");
    let threeLocationElement = threeElement.querySelector("#location-three");
    let threeTime = moment().tz("Europe/Paris");
    let threeImage = threeElement.querySelector("#location-three-flag");
    threeImage.src = "images/fr.png";
    threeDateElement.innerHTML = threeTime.format("dddd, MMMM D, YYYY");
    threeTimeElement.innerHTML = threeTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
    threeLocationElement.innerHTML = "Paris";
  }

  let fourElement = document.querySelector("#display-location-four");
  if (fourElement) {
    let fourDateElement = fourElement.querySelector("#location-four-date");
    let fourTimeElement = fourElement.querySelector("#location-four-time");
    let fourLocationElement = fourElement.querySelector("#location-four");
    let fourTime = moment().tz("Asia/Tokyo");
    let fourImage = fourElement.querySelector("#location-four-flag");
    fourImage.src = "images/jp.png";
    fourDateElement.innerHTML = fourTime.format("dddd, MMMM D, YYYY");
    fourTimeElement.innerHTML = fourTime.format("h:mm:ss [<small>]A[</small>]");
    fourLocationElement.innerHTML = "Tokyo";
  }

  let fiveElement = document.querySelector("#display-location-five");
  if (fiveElement) {
    let fiveDateElement = fiveElement.querySelector("#location-five-date");
    let fiveTimeElement = fiveElement.querySelector("#location-five-time");
    let fiveLocationElement = fiveElement.querySelector("#location-five");
    let fiveTime = moment().tz("Antarctica/South_Pole");
    let fiveImage = fiveElement.querySelector("#location-five-flag");
    fiveImage.src = "images/aq.png";
    fiveDateElement.innerHTML = fiveTime.format("dddd, MMMM D, YYYY");
    fiveTimeElement.innerHTML = fiveTime.format("h:mm:ss [<small>]A[</small>]");
    fiveLocationElement.innerHTML = "South Pole";
  }
}

function myLocation(zone) {
  if (zone) {
    //let myZone = `${zone}`;
    let myCity = document.querySelector("#show-location");
    let myFlag = document.querySelector("#flag");
    let myTime = document.querySelector("#show-time");
    let myDate = document.querySelector("#show-date");
    myTime.innerHTML = moment().tz(`${zone}`).format("h:mm:ss a");
    myDate.innerHTML = moment().tz(`${zone}`).format("dddd, MMMM D, YYYY");
    myCity.innerHTML = myCityLocation;
    myFlag.innerHTML = "";

    let apiKey = "AQUH9CHWDFME";
    let countryCode;
    fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${zone}`
    )
      .then((response) => response.json())
      .then((data) => {
        let countryCode = data.countryCode.toLowerCase();
        myFlag.src = `images/${countryCode}.png`;
      })
      .catch((error) => console.error(error));

    return {
      dateElement: myDate,
      timeElement: myTime,
      zoneElement: zone,
    };
  }
}

myCityLocation = null;
myStateLocation = null;
myCountryLocation = null;
myZone = null;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
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
          myZone = data.time_zone.name;
          if (zoneName !== null) {
            myLocation(zoneName);
            //console.log(zoneName);
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

function updateCity(event) {
  let cityTimeZone = event.target.value;
  let hello = "";
  if (event.target.value === "my-location") {
    cityTimeZone = moment.tz.guess();
  } else if (event.target.value === "reset") {
    location.reload();
  } else if (event.target.value === "Europe/Rome") {
    hello = "ciao!";
  } else if (event.target.value === "Pacific/Tahiti") {
    hello = "ia orana";
  } else if (event.target.value === "Australia/Sydney") {
    hello = "g'day!";
  } else if (event.target.value === "Atlantic/Canary") {
    hello = "hola!";
  } else if (event.target.value === "Asia/Amman") {
    hello = "مرحباً";
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#display-location");
  citiesElement.innerHTML = `<div class="row align-items-center" id="select-city"><div
    class="col-4 d-flex justify-content-center align-items-center"
    id="select-left"
  >
    <span class="location" id="show-select">${cityName}</span>

  </div>
  <div class="col-4" id="select-middle">
    <span class="date" id="select-date">${cityTime.format(
      "dddd, MMMM	D, YYYY"
    )}</span>
  </div>
  <div class="col-4" id="select-right">
    <span class="time" id="select-time">${cityTime.format(
      "h:mm:ss"
    )} <small>${cityTime.format("A")}</small></span>
  </div></div>
  <div class="hello">${hello}</div>`;

  let buttonReset = document.querySelector("#btn-reset");
  let selectClass = document.querySelector("#selection");
  let buttonClass = document.querySelector("#btn-reset");
  if (selectClass.classList.contains("col-10") === false) {
    selectClass.classList.remove("col-12");
    selectClass.classList.add("col-10");
    buttonClass.classList.add("col-2");
    buttonReset.innerHTML = `<div><button type="button" class="btn btn-primary" id="reset">Reset</button></div>`;
  }

  let resetElement = document.querySelector("#reset");
  resetElement.addEventListener("click", function () {
    location.reload();
  });
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#select-country");
citiesSelectElement.addEventListener("change", updateCity);

//console.log(moment.tz.names())
