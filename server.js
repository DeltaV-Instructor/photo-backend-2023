'use strict';

console.log('server running');


// set up our requires
// ==== packages ====
const express = require('express'); // implies that express has been downloaded
//via npm
// the command to download it and save it is `npm install -S express`
const cors = require('cors');// Cross Origin Resource Sharing : allows connection
const axios  = require('axios');
// between 2 local servers or websites : It can block or allow access to any list
//of urls.
//By default it allows localhost to talk itself
require('dotenv').config();
// const axios = require('axios');
//use statements
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

// add some routes to call the unsplash application
app.get('/', (request, response)=>{
  response.status(200).send('Hi from the server');
});

console.log(process.env.UNSPLASH_API_KEY);
app.get('/photos', async (req,res,next) =>{
  try {
    // console.log('cats',req.query.searchQuery);
    let searchQueryFromFrontEnd = req.query.searchQuery;
    // <https://api.unsplash.com/search/photos?page=1&query=office
    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromFrontEnd}`;
    let apiResults = await axios.get(url);
    // console.log('%%%%%%%%%%%%%%%%%%%',apiResults.data.results);
    let photoResults = apiResults.data.results.map((pic) => {
      return new Photos(pic);
    });
    console.log('GGGGGG',photoResults);
    res.status(200).send(photoResults);
  } catch (error) {
    next(error);
  }
});



// create class to construct objects for us to send back to front end
class Photos {
  constructor(picture){
    this.src = picture.urls.regular;
    this.alt = picture.alt_description;
    this.artist = picture.user.name;
  }
}

//handling routes that exsist
app.get('*', (req, res) => {
  res.status(404).send('These are not the droids your looking 404');
});



//some error handling
//ERRORS
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) =>{
  console.log(error.message);
  res.status(500).send(error.message);
});




// set up server to listen on a prompt
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

