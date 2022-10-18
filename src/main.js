// setting the current date
const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
const monthes = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

let currentDate = document.querySelector('.current-date');

function formatDate(date) {
	return `${days[date.getDay()]}, ${date.getDate()} ${
		monthes[date.getMonth()]
	}, ${date.getHours()}:${date.getMinutes()}`;
}

currentDate.innerHTML = `${formatDate(new Date())}`;

// display weather
function displayWeather(response) {  
  document.querySelector('#current-city').innerHTML = response.data.name;
	document.querySelector('#day-temperature').innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector('#feels-like').innerHTML = Math.round(
		response.data.main.feels_like);
	document.querySelector('#humidity').innerHTML = response.data.main.humidity;
	document.querySelector('#pressure').innerHTML = response.data.main.pressure;
	document.querySelector('#wind').innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector('#weather-description').innerHTML =
		response.data.weather[0].main;
}

function searchCity(cityName) {
	const apiKey = '451ebd191aa070edb6802ed47f595d5d';
	const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
		.concat(cityName, '&appid=')
		.concat(apiKey, '&units=metric');
	axios.get(apiUrl).then(displayWeather);
}

searchCity('Kyiv');

// quick city selection

function quickCitySelection(e) {
  e.preventDefault();
  console.log(e);
  searchCity(e.target.innerHTML);
}

let newYorkLink = document.querySelector('#new-york-link');
newYorkLink.addEventListener('click', quickCitySelection);

let kyivLink = document.querySelector('#kyiv-link');
kyivLink.addEventListener('click', quickCitySelection);

let londonLink = document.querySelector('#london-link');
londonLink.addEventListener('click', quickCitySelection);

let parisLink = document.querySelector('#paris-link');
parisLink.addEventListener('click', quickCitySelection);

let tokyoLink = document.querySelector('#tokyo-link');
tokyoLink.addEventListener('click', quickCitySelection);

let sydneyLink = document.querySelector('#sydney-link');
sydneyLink.addEventListener('click', quickCitySelection);

// city selection
let currentCity = document.querySelector('#current-city');

function changeCity(event) {
	event.preventDefault();
	let input = document.querySelector('.search-input');
	if (input.value.length !== 0) {
		currentCity.innerHTML = `${input.value}`;
  }
  searchCity(input.value);
	searchingForm.reset();
}

let searchingForm = document.querySelector('#searching-form');
searchingForm.addEventListener('submit', changeCity);

// get current location

function searchLocation(position) {
	const apiKey = '451ebd191aa070edb6802ed47f595d5d';
	const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='
		.concat(position.coords.latitude, '&lon=')
		.concat(position.coords.longitude, '&appid=')
		.concat(apiKey, '&units=metric');
	axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector('.current-location-button');
currentLocationButton.addEventListener('click', getCurrentLocation);

// temperature conversion
let celsius = document.querySelector('#celsius-link');
let fahrenheit = document.querySelector('#fahrenheit-link');

celsius.addEventListener('click', convertToCelsius);
fahrenheit.addEventListener('click', convertToFahrenheit);

function convertToFahrenheit(event) {
	event.preventDefault();
	var dayTemperature = document.querySelector('#day-temperature');
	dayTemperature.innerHTML = 66;
}

function convertToCelsius(event) {
	event.preventDefault();
	var dayTemperature = document.querySelector('#day-temperature');
	dayTemperature.innerHTML = 19;
}
