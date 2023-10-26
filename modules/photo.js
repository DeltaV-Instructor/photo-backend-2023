

const axios  = require('axios');
const express = require('express');
const app = express();
// app.get('/photos', async (req,res,next) =>{
// eslint-disable-next-line no-unused-vars
// async function getPhotos(req, res, next){
//   console.log('did we get here!');
//   try {
//     let searchQueryFromFrontEnd = req.query.searchQuery;
//     let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromFrontEnd}`;
//     let apiResults = await axios.get(url);
//     let photoResults = apiResults.data.results.map((pic) => {
//       return new Photos(pic);
//     });
//     res.status(200).send(photoResults);
//   } catch (error) {
//     next(error);
//   }
// }


function getPhotos(req, res, next){
  console.log('did we get here!');
  try {
    let searchQueryFromFrontEnd = req.query.searchQuery;
    let url = `https://api.unsplash.com/search/photos`;
    let params = {
      client_id :process.env.UNSPLASH_API_KEY,
      query: searchQueryFromFrontEnd
    };
    axios.get(url,{params})
      .then(apiResults => apiResults.data.results.map((pic) => new Photos(pic)))
      .then(photoResults => res.status(200).send(photoResults))
      .catch(error => console.log(error));
  } catch (error) {
    next(error);
  }
}



class Photos {
  constructor(picture){
    this.src = picture.urls.regular;
    this.alt = picture.alt_description;
    this.artist = picture.user.name;
  }
}


app.use((error, req, res, next) =>{
  console.log(error.message);
  res.status(500).send(error.message);
});

module.exports = getPhotos;
