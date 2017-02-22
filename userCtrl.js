var users = require('./users.js');


module.exports = {
  readAll: function() {
    return users.find();
  },
  findUserById: function(id) {
    var user = users.findOne("id", id);
    if(user) {
      return user;
    }
    else {
      return null
    }
  },
  getAdmins: function() {
    var admins = users.find("type", "admin");
    if(admins) {
      return admins
    }
    else {
      return null
    }
  },
  getNonAdmins: function() {
    var nonAdmins = users.find("type", "user");
    if(nonAdmins) {
      return nonAdmins;
    }
    else {
      return null;
    }
  },
  getUsersByFavorite: function(fav) {
    var allUsers = users.find();
    var fltrd = allUsers.filter(function(usr) {
      return usr.favorites.indexOf(fav) !== -1
    })
    if(fltrd) {
      return fltrd;
    }
    else {
      return null;
    }
  },
  getUsersByAgeLimit: function(age) {
    var allUsers = users.find();
    var fltrd = allUsers.filter(function(usr) {
      return usr.age < age;
    })
    if(fltrd) {
      return fltrd;
    }
    else {
      return null;
    }
  },
  findUserByQuery: function(query, value) {
    var found = users.find(query, value);
    if(found) {
      return found;
    }
    else {
      return null;
    }
  },
  updateUser: function(id, obj) {
    users.update("id", id, obj);
    var updated = users.findOne("id", id);
    if(updated) {
      return updated;
    }
    else {
      return null
    }
  },
  createUser: function(newUser) {
    var added = users.add(newUser);
    if(added) {
      return added;
    }
    else {
      return null;
    }
  },
  removeUser: function(id) {
    var removed = users.findOne("id", id);
    users.remove("id", id);
    if(removed) {
      return removed;
    }
    else {
      return null;
    }
  }
}
