var express = require('express');
var router = express.Router();
var unirest = require('unirest');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: "Let's get Trailblazin'"});
// });

router.get('/', function(req, res, next) {

  unirest
  .get("https://trailapi-trailapi.p.mashape.com/?q[city_cont]=Denver&radius=25")
  .header("X-Mashape-Key", "kJOUgKpJFamshTFuvY7O2GnTccWup1ilLFPjsnmEQTvRxk1qPG")
  .header("Accept", "text/plain")
  .end(function (result) {
    // console.log(
    //   result.status,
    //   result.headers,
    //   result.body);

  unirest
  .get("https://twinesocial.p.mashape.com/v1/content?campaign=derektrails")
  .header("X-Mashape-Key", "fn4a5vCfS4mshcgPHf87Ksd6rjhKp1MBa0YjsnDWurXz4ZsZsW")
  .header("Accept", "application/json")
  .end(function (result2) {
    // console.log(result2.status, result2.headers, result2.body);
    // console.log(result2.body);

  res.render('index', {title: "Search Results:", result: result.body.places, social: result2.body.rows })
})
})
});




module.exports = router;
