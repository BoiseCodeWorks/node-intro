;(function(){

  var express = require('express');
  var bodyParser = require('body-parser');
  var server = express();
  var port = 8085;

  var User = require('./server-assets/models/user');

  server.use(bodyParser.json())

  server.get('/', function(req, res){
    res.send(`IT'S ALIVE!!!!!`)
  })

  server.post('/register', function(req, res){
    var result = User.createUser(req.body.email, req.body.password);
    res.send(result);
    console.log(users);
  })

  server.post('/login', function(req, res){
    var user = User.getUserByEmail(req.body.email);
    if(user.error){
      return res.send(user);
    }
    var result = user.checkPassword(req.body.password);
    return res.send(result);
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