var bodyParser = require('body-parser');
var express = require('express');
var userCtrl = require('./userCtrl.js');



var port = 3000;

var app = express();
app.use(bodyParser.json());

app.get('/api/users', function(req, res) {
  if(req.query.favorites) {
    var usersByF = userCtrl.getUsersByFavorite(req.query.favorites);
    res.status(200).send(usersByF);
  }
  if(req.query.age) {
    var usersByA = userCtrl.getUsersByAgeLimit(req.query.age);
    res.status(200).send(usersByA);
  }
  if(req.query.lastname) {
    var usersByLN = userCtrl.findUserByQuery("last_name", req.query.lastname);
    res.status(200).send(usersByLN);
  }
  if(req.query.email) {
    var usersByE = userCtrl.findUserByQuery("email", req.query.email);
    res.status(200).send(usersByE)
  }
  else {
    var users = userCtrl.readAll();
    res.status(200).send(users);
  }
});
app.get('/api/users/:userId', function(req, res) {
  var userById = userCtrl.findUserById(req.params.userId);
  res.status(200).send(userById);
});
app.get('/api/admins', function(req, res) {
  var admins = userCtrl.getAdmins();
  res.status(200).send(admins);
});
app.get('/api/nonadmins', function(req, res) {
  var nonadmins = userCtrl.getNonAdmins();
  res.status(200).send(nonadmins);
});
app.put('/api/users/:userId', function(req, res) {
  var updated = userCtrl.updateUser(parseInt(req.params.userId), req.body);
  res.status(200).send(updated);
})
app.post('/api/users', function(req, res) {
  var added = userCtrl.createUser(req.body);
  res.status(200).send(added);
})
app.delete('/api/users/:userId', function(req, res) {
  var deleted = userCtrl.removeUser(parseInt(req.params.userId));
  res.status(200).send(deleted);
})

module.exports = app;

// app.listen(port, function() {
//   console.log("Started server on port " + port);
// });
