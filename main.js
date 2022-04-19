// weather API key: 43a4fc1d57ca43ffdcb19646a9f234c4
// giphy API key: wN6wx8BBaNy93dUasfhnvLg3hRnyR8hL

//Form submission default action override
document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
  event.stopPropagation();
  formSubmitted();
  document.getElementById('form').reset();
});

//Onload runs this to get a basic background
async function pageLoad() {
  fetch(
    'https://api.giphy.com/v1/gifs/translate?api_key=wN6wx8BBaNy93dUasfhnvLg3hRnyR8hL&s=nature',
    { mode: 'cors' }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let url = response.data.images.original.url;
      document.body.style.backgroundImage = 'url(' + url + ')';
    });
}

//Calls async functions that call APIs for getting the weather and for changing the background gif
function formSubmitted() {
  getWeather();
}

//Populates the page with DOM manipulation after the form is submitted, data is the JSON of weather data
function populatePage(data) {
  console.log('todo');
}

async function getWeather() {
  let inputs = document.getElementById('form').elements;
  //0 is zipcode, 1 is country code
  const data = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?zip=' +
      inputs[0].value +
      ',' +
      inputs[1].value +
      '&appid=43a4fc1d57ca43ffdcb19646a9f234c4&units=metric',
    { mode: 'cors' }
  ).catch((err) => {
    console.log(err);
  });
  let weatherData = await data.json();
  console.log(weatherData);
  if (
    weatherData.message === 'city not found' ||
    weatherData.message === 'invalid zip code'
  ) {
    alert(weatherData.message);
    return;
  }
  getBackground(String(weatherData.weather[0].main));
  populatePage(weatherData);
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('results').textContent = weatherData.main.temp;
}

async function getBackground(input) {
  const response = await fetch(
    'https://api.giphy.com/v1/gifs/translate?api_key=wN6wx8BBaNy93dUasfhnvLg3hRnyR8hL&s=' +
      input,
    { mode: 'cors' }
  );
  let background = await response.json();
  let url = background.data.images.original.url;
  document.body.style.backgroundImage = 'url(' + url + ')';
}

//Start of page flow
pageLoad();
