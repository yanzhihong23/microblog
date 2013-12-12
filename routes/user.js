
/**
 * User Routing
 */
var User = require('../models/user');

exports.signUp = function(req, res){
    res.render('signup');
}

exports.doSignUp = function(req, res){
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.get(newUser.username, function(err, user){
        if(user){
            err = 'username already exits.'
        }
        if(err){
            req.flash('error', err);
            return res.redirect('/signup');
        }
        newUser.save(function(err){
            if(err){
                req.flash('error', err);
                return res.redirect('/signup');
            }
            res.redirect("/");
        });
    });
};

exports.logIn = function(req, res){
    res.render('login');
}

exports.doLogIn = function(req, res){
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.get(newUser.username, function(err, user){
        if(user && user.password === newUser.password){
            return res.redirect("/");
        }

        req.flash('error', err);
        res.redirect('/login');
    });
}