/**
 * Created by zhhyan on 13-12-19.
 */
var db = require('./db.js');
var microblogs = db.get('microblogs');

function Microblog(microblog) {
    this.content = microblog.content;
    this.time = microblog.content;
    this.username = microblog.username;
}

module.exports = Microblog;

Microblog.prototype.save = function(callback){
    microblogs.insert({
        content: this.content,
        time: this.time,
        username: this.username
    }, callback);
};

Microblog.get = function(username, callback){
    var query = {};
    if(username){
        query.username = username;
    }
    microblogs.find(query).sort({time: -1}).toArray(function(err, docs){
        if(docs){
            var array = [];
            docs.forEach(function(doc, index){
                array.push(new Microblog(blog));
            });
            callback(null, array);
        }else{
            callback(err, null);
        }
    })
}
