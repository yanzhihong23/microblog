
/*
 * GET home page.
 */

exports.index = function(req, res){
    if(req.session.user){
        res.render('index', { title: 'Twitter'});
    }else{
        res.redirect('/login');
    }
};