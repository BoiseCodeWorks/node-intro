;(function(){

  var express = require('express');
  var bodyParser = require('body-parser');
  var server = express();
  var port = 8085;
  var idCounter = 001;
  server.use(bodyParser.json())


  function _assignId(){
    var id = idCounter;
    idCounter++;
    return id;
  }

  var users = {};

  function addUser(email, password){
    if(!email || !password){
      return {error: 'Sorry you must provide and email and password to register'}
    }
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if(user.email == email){
        return {error: 'Sorry that email is not valid for registration'}
      }
    }
    var id = _assignId()
    users[id] = {id: id, email: email, password: password}
    return {message: 'User successfully created'}
  }

  function findUserByEmail(email, password){
    for(var id in users){
      var user = users[id];
      if(user.email == email && user.password == password){
        return user;
      }
    }
    return {error: 'Sorry no user was found'}
  }

  server.get('/', function(req, res){
    res.send(`IT'S ALIVE!!!!!`)
  })

  server.post('/register', function(req, res){
    var result = addUser(req.body.email, req.body.password);
    res.send(result);
    console.log(users);
  })

  server.post('/login', function(req, res){
    var result = findUserByEmail(req.body.email, req.body.password);
    res.send(result);
  })

  server.put('/users/:id', function(req, res){
    if(!req.params.id){
      return {error: 'BAD ID'}
    }
    users[req.params.id] = req.body.user
    res.send('User update successful');
  })


  server.listen(port, function(){
    console.log('The server is alive and kicking on port:', port);
  })

}());