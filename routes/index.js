var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/trails-db');

var trailsCollection = db.get('trails');
var bcrypt = require('bcryptjs');

//



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/sign-up', function(req, res, next) {
  if(req.body.password == req.body.password_confirm){
  var hash = bcrypt.hashSync(req.body.password, 8);

  trailsCollection.insert({email: req.body.email, password: hash});
  res.redirect('/trails')
} else {
  res.render('index', {error: "Password and confirmation must match, yo."})
}
});



router.post('/login', function(req, res, next) {
  var emailLog = req.body.log_email;
  trailsCollection.findOne({ email: emailLog }, function(err, record) {
    if(record) {
      var compare = bcrypt.compareSync(req.body.log_password, record.password);

      if (compare === true) {
        res.redirect('/trails')
        // {message: "You are logged in my friend."});
      } else {
        res.render('index', {message: "Wrong password, yo."});
      };

    } else {
      res.render('index', {message: "That account don't exist, partner."});
    }
  })
})



//after login, this gets the trails/index.jade, which will show just the search bar
router.get('/trails', function(req, res, next) {
  res.render('trails/index', {title: "Scour the Trails:", message: "You've been logged in!"})

});



//after searching, this will activate the api by req.body.search
router.get('/results', function(req, res, next) {
  var location_value = "colorado";


  unirest
    .get("https://trailapi-trailapi.p.mashape.com/?q[state_cont]="+ location_value + "&radius=25")
    .header("X-Mashape-Key", "kJOUgKpJFamshTFuvY7O2GnTccWup1ilLFPjsnmEQTvRxk1qPG")
    .header("Accept", "application/json")
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

  res.render('trails/results', {
    title: "Search Results:",
    result: result.body.places,
    social: result2.body.rows
    })
})
})
});




router.get('/results2', function(req, res, next) {

  var location_value = "colorado";

  unirest
    .get("https://trailapi-trailapi.p.mashape.com/?q[state_cont]="+ location_value + "&radius=25")
    .header("X-Mashape-Key", "kJOUgKpJFamshTFuvY7O2GnTccWup1ilLFPjsnmEQTvRxk1qPG")
    .header("Accept", "application/json")
    .end(function (result) {
      // console.log(
      //   result.status,
      //   result.headers,
      //   result.body);

    // unirest
    // .get("https://twinesocial.p.mashape.com/v1/content?campaign=derektrails")
    // .header("X-Mashape-Key", "fn4a5vCfS4mshcgPHf87Ksd6rjhKp1MBa0YjsnDWurXz4ZsZsW")
    // .header("Accept", "application/json")
    // .end(function (result2) {
      // console.log(result2.status, result2.headers, result2.body);
      // console.log(result2.body);

  res.render('trails/results2', {
    title: "Search Results:",
    result: result.body.places,
    // social: result2.body.rows
    })
// })
})
});



//These work to take to results page, but am commenting out to see if I can get a replica of the trails api search
//working correctly without the redirect


router.post('/results', function(req, res, next) {
  res.redirect('/results')

});

router.post('/results2', function(req, res, next) {
  res.redirect('/results2')

});



module.exports = router;
