/**
 * Created by Zhihong on 13-12-12.
 */

//var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/microblog');

module.exports = db;