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
  }

  // New York
  let newYorkElement = document.querySelector("#display-new-york");
  if (newYorkElement) {
    let newYorkDateElement = newYorkElement.querySelector("#new-york-date");
    let newYorkTimeElement = newYorkElement.querySelector("#new-york-time");
    let newYorkTime = moment().tz("America/New_York");
    newYorkDateElement.innerHTML = newYorkTime.format("dddd, MMMM D, YYYY");
    newYorkTimeElement.innerHTML = newYorkTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // London
  let londonElement = document.querySelector("#display-london");
  if (londonElement) {
    let londonDateElement = londonElement.querySelector("#london-date");
    let londonTimeElement = londonElement.querySelector("#london-time");
    let londonTime = moment().tz("Europe/London");
    londonDateElement.innerHTML = londonTime.format("dddd, MMMM D, YYYY");
    londonTimeElement.innerHTML = londonTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // Paris
  let parisElement = document.querySelector("#display-paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector("#paris-date");
    let parisTimeElement = parisElement.querySelector("#paris-time");
    let parisTime = moment().tz("Europe/Paris");
    parisDateElement.innerHTML = parisTime.format("dddd, MMMM D, YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
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
      `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${zone}`
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

updateTime();
setInterval(updateTime, 1000);

//console.log(moment.tz.names());
