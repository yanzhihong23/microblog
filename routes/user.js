
/**
 * User Routing
 */
var User = require('../models/user');

exports.signUp = function(req, res){
    res.render('signup', {title: 'Sign up'});
}

exports.doSignUp = function(req, res){
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.get(newUser.username, function(err, user){
        if(user){
            err = 'Username already exits. Please choose another one.'
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
            req.session.user = newUser;
            req.flash('success', 'Sign up success.');
            res.redirect('/');
        });
    });
};

exports.logIn = function(req, res){
    res.render('login', {title: 'Login'});
}

exports.doLogIn = function(req, res){
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.get(newUser.username, function(err, user){
        if(!user){
            req.flash('error', 'User ' + newUser.username + ' does not exit.');
            return res.redirect('/login');
        }

        if(user.password !== newUser.password){
            req.flash('error', 'Wrong password.');
            return res.redirect('/login');
        }

        req.session.user = newUser;
        req.flash('success', 'Login success.');
        res.redirect('/');
    });
}

exports.logout = function(req, res){
    req.session.user = null;
    req.flash('success', 'Logout success.');
    res.redirect('/');
}