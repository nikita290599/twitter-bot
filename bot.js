const dotenv = require('dotenv');
const Twitter = require('twitter');
const fetch = require('node-fetch');
dotenv.config({ path: './config.env' });
const axios = require('axios');

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});
var url = 'https://newsapi.org/v2/top-headlines?' +
  'country=in&' + 'category=technology&' +
  'apiKey=' + process.env.API_KEY;

let i=0;
function randomNum(){
  return Math.floor(Math.random()*6)
}


let newsTechWithImage = [];
function shareCat(){
  axios.get(url)
  .then(function (response) {
    // // handle success
    
    data = response.data.articles;
    newsTechWithImage=data;
    // console.log("\n\nnewsTech ",newsTechWithImage);
    if (data.length === 0) {
      console.log("nothing");
    }

    if (data.length > 0) {
      // Filter cats with photos
      techWithPhotos = newsTechWithImage.filter((item) => item.url.length > 0);
      
      twitterClient.post(
        'statuses/update',
        {
          status: `Tech news\n ${techWithPhotos[randomNum()].title}\n ${techWithPhotos[randomNum()].description}`,
        },
        function (error, tweet, response) {
          if (!error) {
            console.log(tweet);
          }
          if (error) {
            console.log(error);
          }
        }
      );

      
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

  






setInterval(shareCat, 1000*60*10); // Share every 10 mins afterwards
