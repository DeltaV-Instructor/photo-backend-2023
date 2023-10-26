'use strict';

console.log('server running');

const express = require('express');
const cors = require('cors');
const axios  = require('axios');
require('dotenv').config();
const getPhotos = require('./modules/photo');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

app.get('/', (request, response)=>{
  response.status(200).send('Hi from the server');
});




app.get('/photo', getPhotos);



app.get('*', (req, res) => {
  res.status(404).send('These are not the droids your looking 404');
});
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) =>{
  console.log(error.message);
  res.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

