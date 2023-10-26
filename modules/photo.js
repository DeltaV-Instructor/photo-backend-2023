






console.log(process.env.UNSPLASH_API_KEY);

// app.get('/photos', async (req,res,next) =>{
function getPhotos(req, res, next){

  try {
    let searchQueryFromFrontEnd = req.query.searchQuery;
    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromFrontEnd}`;
    let apiResults = await axios.get(url);
    let photoResults = apiResults.data.results.map((pic) => {
      return new Photos(pic);
    });
    res.status(200).send(photoResults);
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