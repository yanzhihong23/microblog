
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');

var app = express();

// all environments
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session({cookie: {maxAge: 60000}}));
    app.use(flash());
    //view integration
    app.use(function(req, res, next){
        res.locals.user = req.session.user;
        var success = req.flash("success");
        var error = req.flash("error");
        res.locals.success = success.length ? success : null;
        res.locals.error = error.length ? error : null;
        next();
    });
    app.use(app.router);
    app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
    app.use(express.static(path.join(__dirname, 'public')));
});

// development only
app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

//sign up
app.get('/signup', user.signUp);
app.post('/doSignUp', user.doSignUp);
//login
app.get('/login', user.logIn);
app.post('/doLogIn', user.doLogIn);
//logout
app.get('/logout', user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
