/**
 * Created by zhhyan on 13-12-12.
 */
var crypto = require('crypto');
//db
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/microblog');
var users = db.get('users');

function User(user){
    var md5 = crypto.createHash('md5');
    var password = md5.update(user.password).digest('base64');

    this.username = user.username;
    this.password = password;
}


module.exports = User;
User.prototype.save = function(callback){
    users.insert({
        username: this.username,
        password: this.password
    }, callback);
};

User.get = function(username, callback){
    users.findOne({username: username}, function(err, doc){
        if(doc){
            var user = new User(doc);
            callback(err, doc);
        }else{
            callback(err, null);
        }
    });
};