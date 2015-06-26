var express = require('express');
var router = express.Router();
var unirest = require('unirest');


/* GET home page. */
router.get('/', function(req, res, next) {

  unirest
  .get("https://trailapi-trailapi.p.mashape.com/?limit=20&q[activities_activity_type_name_eq]=hiking&q[city_cont]=Denver&radius=250")
  .header("X-Mashape-Key", "kJOUgKpJFamshTFuvY7O2GnTccWup1ilLFPjsnmEQTvRxk1qPG")
  .header("Accept", "text/plain")
  .end(function (result) {
    console.log(
      result.status,
      result.headers,
      result.body);

  res.render('index', { title: "Let's get Trailblazin'", result: result.body.places });
})

});

module.exports = router;
