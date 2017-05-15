var express = require('express');
var router = express.Router();
var User = require('../models/user');


//GET  /register
router.get('/register', function(req, res, next) {
    return res.render('register', { title: 'Sign Up' });
});

//POST /register
router.post('/register', function(req, res, next){
    if (req.body.heroName &&
        req.body.name &&
        req.body.superpower &&
        req.body.password &&
        req.body.confirmPassword) {

            //confirm password entered twice
            if (req.body.password !== req.body.confirmPassword){
                var err = new Error("Passwords do not match.");
                err.status = 400;
                return next(err);
            }

            //create object with form input
            var userData = {
                heroName: req.body.heroName,
                name: req.body.name,
                superpower: req.body.superpower,
                password: req.body.password
            };

            //use schema's "create" method to insert object into mongo
            User.create(userData, function (error, user){
                if (error) {
                    return next(error);
                } else {
                    return res.redirect('/profile');
                }
            });
        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
});

router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
    return res.render('about', { title: 'About' });
});

router.get('/heroes', function(req, res, next) {
    return res.render('heroes', { title: 'Heroes' });
});

module.exports = router;