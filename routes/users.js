var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const users = require('../database/queries/users.js');

router.get('/', function(request, response, next) {
  response.send('respond with a resource');
});

router.get('/login', function(request, response, next) {
  response.render('login', {username: '', error: false});
});

router.post('/login', (request, response, next) => {
  console.log( '---===request.body===---', request.body ); 
  const { username, password } = request.body
  users.queries.find( username )
  .then( (user) => {
    console.log( '---===user in login promise===---', user ); 
    bcrypt.compare( password, user.password )
    .then( (validatedUser) => {
      request.session.userId = user.id
      response.redirect('./profile')
    }).catch((error) => {
      console.log( '---===error validating user===---', error.message ); 
    })
  }).catch((error) => {
    console.log( '---===login failed===---', error.message ); 
  })
})

router.get('/create', function(request, response, next) {
  response.render('create_user');
});

router.post('/create', (request, response, next) => {
  const user = request.body
  if (user.passwordConfirm === user.password) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      users.queries.create(user.name, hash)
      .then( user => {
        console.log( '---===user===---', user ); 
        request.session.userId = user.id
        console.log( '---===request.session===---', request.session ); 
        response.render('login', { user, error: false })
      })
      .catch( error => {
        response.status(500).send(error.message)
      })
    })
  } 
})

router.get('/profile', (request, response) => {
  if (request.session.userId) {
    users.queries.findById(request.session.userId)
    .then( (user) => {
      response.render('profile', { user })
    })
  } else {
    response.render('login', { error: true })
  }
})

router.get('/logout', (request, response) => {
  request.session.destroy()
  response.redirect('/')
})
module.exports = router;
