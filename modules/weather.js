'use strict';
console.log('weather js file connected');

let cache = require('./cache.js');
const axios = require('axios');





async function getWeather(lat, lon, locationName){
  console.log('in the get weather',locationName);
  //is going to call our api to get a weather forecast
  const key = 'weather- ' + lat + lon;
  // http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=5&api-no&alerts=no&q=${locationName}`;
  // console.log(url);





  //weatherbit.io
  // const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;
  // console.log(url);






  //set the search into cache to find out if we have previously search for the same weather.
  // console.log('11111',key);
  // if(condition where its not it cache or its been in cache to long and we need to update)
  if(cache[key] && (Date.now() - cache[key].timestamp < 5000)){
    console.log('Cache hit, thats going to cost us $$');
  } else {
    console.log('Cache miss or its old, so we need to put into cache new or update forecast data');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(apiResponse => parseWeather(apiResponse.data));
    // .then(apiResponse => console.log('before the parseWeather',apiResponse.data));
  }
  //is going send the axios response from the api to function called parseWeather
  //return the data to the server file
  return cache[key].data;
  // return true;
}


function parseWeather(weatherData){
  //we are going to loop over the api data and send it to our weather class for instantiation for our front to render
  // console.log('EEEEEEE', weatherData);
  // console.log('parse the data:', weatherData.forecast.forecastday);
  // console.log('parse the data:', weatherData.current.condition.text);
  // console.log('parse the data:', weatherData.forecast.forecastday);
  try {
    const weatherSummaries = weatherData.forecast.forecastday.map(day => {
      return new Weather(day);
    });
    console.log('back from our class constructor:',weatherSummaries);
    return Promise.resolve(weatherSummaries);
  } catch (error) {
    return Promise.reject(error);
  }

}



class Weather{
  constructor(day){
    console.log('weather day?', day);
    this.forecast = day.day.condition.text;
    this.time = day.date;

  }
}





module.exports = getWeather;
