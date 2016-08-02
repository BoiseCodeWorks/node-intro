;(function(){

  var express = require('express');
  var bodyParser = require('body-parser');
  var server = express();
  var port = 8085;

  var User = require('./server-assets/models/user');
  var Monster = require('./server-assets/models/monster');

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

  server.post('/monsters', function(req, res) {
    if(!req.body.name){
      return res.send({error: 'YOU CANNONT CREATE A MONSTER WITHOUT A NAME'})
    }
    Monster.create(req.body.name, req.body.type, req.body.weapon, req.body.job);
    return res.send({message: 'Successfully created a new Monster, please save us :( '})
  })
  
  server.get('/monsters', function(req, res) {
    
    if(req.query.x){
      return res.send(Monster.getByValue(req.query.x));
    }
    
    return res.send(Monster.getAll());
  })

  server.get('/monsters/:id', function(req, res) {
    return res.send(Monster.get(req.params.id));
  })

  server.put('/monsters/:id', function(req, res) {
    return res.send(Monster.edit(req.params.id, req.body.monster));
  })

  server.listen(port, function(){
    console.log('The server is alive and kicking on port:', port);
  })

}());