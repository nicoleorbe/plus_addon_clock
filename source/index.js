function resetPage() {
  location.reload();
}

function displayClocks(response) {
  let clock = response.data;
  let clockElement = document.querySelector("#display-clock");
  let clockHTML = `<div class="row" id="display-my-location">`;

  //   let myZone = document.querySelector("#show-my-location");
  //   let myFlag = document.querySelector("#my-flag");
  //   let myTime = document.querySelector("#show-my-time");
  //   let myDate = document.querySelector("#show-my-date");
  //   let myCountry = myCountryLocation.replace(/\s/g, "").split("");
  //   let myCountryWord = myCountry.join("");
  //   myTime.innerHTML = moment().tz(`${zone}`).format("h:mm:ss a");
  //   myDate.innerHTML = moment().tz(`${zone}`).format("dddd, MMMM D, YYYY");
  //   myZone.innerHTML = myCityLocation;
  //   myFlag.innerHTML = "";
  //   myFlag.src = `images/${myCountryWord}.png`;

  clock.forEach(function (clockSample, index) {
    if (index < 4 && index > 0) {
      let flag = `https://flagcdn.com/16x12/${countryCode}.png`;

      let maxTemp = Math.round(forecastDay.temp.max);
      let minTemp = Math.round(forecastDay.temp.min);

      clockHTML =
        clockHTML +
        `       <div class="col-6" id="clock-left">
                    <span class="show-clock" id="show-clock">
                    London
                    </span>
                    <span id="show-clock-flag">
                    <img src="${flag}" alt="" id="clock-flag" class="flag" />
                    </span>
                    <br />
                    <span id="show-clock-date">Date</span>
                </div>
                <div class="col-6" id="clock-right">
                    <span id="show-clock-time" class="time">
                    Time
                    </span>
                </div>
          `;
    }
  });
  clockHTML = clockHTML + `</div>`;
  clockElement.innerHTML = clockHTML;
}

function getClock() {
  if (typeof moment === "undefined") {
    var moment = require("moment-timezone");
  }
  if (typeof countryTz === "undefined") {
    var countryTz = require("country-tz");
  }

  let timezoneNames = moment.tz.names();

  let randomSample = [];
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * timezoneNames.length);
    let timezone = timezoneNames[randomIndex];
    let countryCode = getCountryCode(timezone);
    let population = moment.tz.zone(timezone).population;
    if (population > 500000) {
      randomSample.push({ timezone, countryCode, population });
    }
  }

  return randomSample;
}

let randomSample = getClock();
displayClocks(randomSample);
getClock();
