const express = require('express');
const router = express.Router();
const session = require('express-session');

/* GET home page. */
router.get('/', function(request, response, next) {
  console.log( '---===request.session.user===---', request.session.user ); 
  if (request.session.user) {
    queries.findById(request.session.userId)
    .then( user => {
      response.render('profile', { user })
    }) 
  } else {
    response.render('index', {title: 'Roam'})
  }
});

module.exports = router;
