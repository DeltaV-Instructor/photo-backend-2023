'use strict';
console.log('server running');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const getPhotos = require('./modules/photo');
const weather = require('./modules/weather.js');
// console.log('is this our function',weather);
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

app.get('/', (request, response)=>{
  response.status(200).send('Hi from the server');
});




app.get('/photos', getPhotos);
app.get('/weather', weatherHandler);




function weatherHandler(request, response){
  //take in our front end values and send them to our weather.js and then get back some weather to send to the front end
  //destructure our request object
  const {lat, lon, locationName} = request.query;
  console.log('request.query', lat, lon,locationName);
  //this is calling the function in our weather file with our arguments
  weather(lat, lon,locationName)
    .then(weatherForecasts => response.status(200).send(weatherForecasts))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry, something went wrong!');
    });
  // response.status(200).send('WIP');
}



app.get('*', (req, res) => {
  res.status(404).send('These are not the droids your looking 404');
});
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) =>{
  console.log(error.message);
  res.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

