function updateTime() {
  // Los Angeles
  let newYorkElement = document.querySelector("#new-york-location");
  if (newYorkElement) {
    let newYorkDateElement = newYorkElement.querySelector("#new-york-date");
    let newYorkTimeElement = newYorkElement.querySelector("#new-york-time");
    let newYorkTime = moment().tz("America/New_York");

    console.log(newYorkTime);
    newYorkDateElement.innerHTML = newYorkTime.format("MMMM	D, YYYY");
    newYorkTimeElement.innerHTML = newYorkTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

//selected city from drop down
// function updateCity(event) {
//   let cityTimeZone = event.target.value;
//   console.log(cityTimeZone);
//   if (cityTimeZone === "my-location") {
//     cityTimeZone = moment.tz.guess();
//   }
//   let cityName = cityTimeZone.replace("_", " ").split("/")[1];
//   let cityTime = moment().tz(cityTimeZone);
//   let citiesElement = document.querySelector("#display-my-location");
//   citiesElement.innerHTML = `
//          <div class="row" id="display-city">
//             <div class="col-6" id="city-left">
//               <span class="show-location" id="show-location"
//                 >${cityName}</span
//               >
//               <span id="show-flag"
//                 ><img src="" alt="" id="flag" class="flag"
//               /></span>
//               <br />
//               <span id="show-date">${cityTime.format("MMMM	Do YYYY")}</span>
//             </div>
//             <div class="col-6" id="city-right">
//               <span id="show-time" class="time">${cityTime.format(
//                 "h:mm:ss"
//               )} <small>${cityTime.format("A")}</small></span>
//             </div>
//           </div>

//   `;
// }

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#select-country");
citiesSelectElement.addEventListener("change", updateCity);

//console.log(moment.tz.zonesForCountry("US"));
