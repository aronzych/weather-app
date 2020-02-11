const form = document.querySelector(".head__form");
const input = document.querySelector(".head__input");
const submit = document.querySelector(".head__submiy");

//today
const today = document.querySelector(".today");

const todayImg = document.querySelector(".today__img");
const todayTemp = document.querySelector(".today__temp");
const todayPress = document.querySelector(".today__press");
const todayWind = document.querySelector(".today__wind");

//forecast
const forecast = document.querySelector(".forecast");

const forecastDays = document.querySelectorAll(".forecast__day--day");
const forecastImgs = document.querySelectorAll(".forecast__day--img");
const forecastTemps = document.querySelectorAll(".forecast__day--temp");

function setDayName(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date(date);
  const dayName = days[d.getDay()];

  return dayName;
}

function setIcon(weather) {
  let weatherIcon;

  if (weather == "Clear") {
    weatherIcon = "http://openweathermap.org/img/wn/01d@2x.png";
  }

  if (weather == "Thunderstorm") {
    weatherIcon = "http://openweathermap.org/img/wn/11d@2x.png";
  }
  if (weather == "Drizzle") {
    weatherIcon = "http://openweathermap.org/img/wn/09d@2x.png";
  }
  if (weather == "Rain") {
    weatherIcon = "http://openweathermap.org/img/wn/10d@2x.png";
  }
  if (weather == "Snow") {
    weatherIcon = "http://openweathermap.org/img/wn/13d@2x.png";
  }

  if (weather == "Atmosphere") {
    weatherIcon = "http://openweathermap.org/img/wn/50d@2x.png";
  }
  if (weather == "Clear") {
    weatherIcon = "http://openweathermap.org/img/wn/01d@2x.png";
  }
  if (weather == "Clouds") {
    weatherIcon = "http://openweathermap.org/img/wn/02d@2x.png";
  }

  return weatherIcon;
}

function fill() {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      input.value +
      "&APPID=7063b5a6b3ec56b1b07066a804142d51"
  )
    .then(response => response.json())
    .then(data => {
      //today
      todayImg.src = setIcon(data.list[0].weather[0].main);
      todayTemp.innerHTML = `${Math.round(
        (data.list[0].main.temp - 273).toFixed(2)
      )} &degC`;
      todayPress.innerText = `${data.list[0].main.pressure} hpa`;
      todayWind.innerText = `${data.list[0].wind.speed} m/s`;

      //forecast
      console.log(data);
      forecastDays[0].innerText = setDayName(data.list[8].dt_txt.slice(0, -9));
      forecastImgs[0].src = setIcon(data.list[8].weather[0].main, 0);
      forecastTemps[0].innerHTML = `${Math.round(
        (data.list[8].main.temp - 273).toFixed(2)
      )} &degC`;

      forecastDays[1].innerText = setDayName(data.list[16].dt_txt.slice(0, -9));
      forecastImgs[1].src = setIcon(data.list[16].weather[0].main, 0);
      forecastTemps[1].innerHTML = `${Math.round(
        (data.list[16].main.temp - 273).toFixed(2)
      )} &degC`;

      forecastDays[2].innerText = setDayName(data.list[24].dt_txt.slice(0, -9));
      forecastImgs[2].src = setIcon(data.list[24].weather[0].main, 0);
      forecastTemps[2].innerHTML = `${Math.round(
        (data.list[24].main.temp - 273).toFixed(2)
      )} &degC`;

      forecastDays[3].innerText = setDayName(data.list[32].dt_txt.slice(0, -9));
      forecastImgs[3].src = setIcon(data.list[32].weather[0].main, 0);
      forecastTemps[3].innerHTML = `${Math.round(
        (data.list[32].main.temp - 273).toFixed(2)
      )} &degC`;
    });

  today.style.opacity = "1";
  forecast.style.opacity = "1";
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  fill();
});

input.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    fill();
  }
});
