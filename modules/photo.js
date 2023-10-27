

const axios  = require('axios');


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

module.exports = getPhotos;
