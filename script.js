'use strict';

const _API_KEY = '65746f314f651426ef62af11a6c74546';

const searchInput = document.querySelector('.city-search');
const dateEl = document.querySelector('.date');
const city = document.querySelector('.city');
const curTemp = document.querySelector('.cur-temp');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const weatherDesc = document.querySelector('.desc');
const tempFeels = document.querySelector('.feels-temp');
const weatherIcon = document.querySelector('.weather-icon i');
const windEl = document.querySelector('.wind');
const humidityEl = document.querySelector('.humidity');
const pressureEl = document.querySelector('.pressure');

const appBody = document.querySelector('.body');
const bodyHeight = appBody.getBoundingClientRect().height;
appBody.style.height = 0;

const revealBody = function () {
  appBody.style.height = `${bodyHeight}px`;
  appBody.style.opacity = 1;
};

const dateNow = Intl.DateTimeFormat('en-UK', { dateStyle: 'medium' }).format(
  new Date()
);
dateEl.innerText = dateNow;

const fetchWeather = function (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${_API_KEY}`
  )
    .then(res => res.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(_ => displayError());
};

const setIcon = function (status) {
  switch (status) {
    case 'Clear':
      weatherIcon.className = 'wi wi-day-sunny';
      break;
    case 'Clouds':
      weatherIcon.className = 'wi wi-cloudy';
      break;
    case 'Rain':
      weatherIcon.className = 'wi wi-rain';
      break;
    case 'Drizzle':
      weatherIcon.className = 'wi wi-sleet';
      break;
    case 'Thunderstorm':
      weatherIcon.className = 'wi wi-thunderstorm';
      break;
    case 'Snow':
      weatherIcon.className = 'wi wi-snow';
      break;
    case 'Dust':
      weatherIcon.className = 'wi wi-dust';
      break;
    case 'Smoke':
      weatherIcon.className = 'wi wi-smoke';
      break;
    case 'Haze':
      weatherIcon.className = 'wi wi-day-haze';
      break;
    case 'Fog':
      weatherIcon.className = 'wi wi-fog';
      break;
    case 'Sand':
      weatherIcon.className = 'wi wi-sandstorm';
      break;
    case 'Tornado':
      weatherIcon.className = 'wi wi-tornado';
      break;
    default:
      weatherIcon.className = 'wi wi-alien';
  }
};

const displayWeather = function (data) {
  const {
    feels_like: feelsLike,
    temp,
    temp_min: tempMin,
    temp_max: tempMax,
    humidity,
    pressure,
  } = data.main;
  const { name } = data;
  const { description, main } = data.weather[0];
  const { speed: wind } = data.wind;

  if (document.querySelector('.error'))
    document.querySelector('.error').remove();

  document.body.style.backgroundImage = `linear-gradient(rgba(237, 178, 36, 0.25), rgba(237, 117, 3, 0.25)), url('https://source.unsplash.com/${screen.width}x${screen.height}/?${name}')`;

  city.innerText = name;
  curTemp.innerText = temp + '°';
  minTemp.innerText = tempMin + '°';
  maxTemp.innerText = tempMax + '°';
  tempFeels.innerText = `Feels like ${feelsLike}°`;
  weatherDesc.innerText = description;
  windEl.innerText = wind + ' km/h';
  humidityEl.innerText = humidity + '%';
  pressureEl.innerText = pressure + ' hPa';
  setIcon(main);

  revealBody();
};

const displayError = function () {
  const html = `
    <p class="error">No results found :( Please try again!</p>
  `;
  if (!document.querySelector('.error'))
    searchInput.insertAdjacentHTML('afterend', html);
};

searchInput.addEventListener('search', function () {
  fetchWeather(this.value);
  this.value = '';
});
