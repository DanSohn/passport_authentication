const express = require('express');
const router = express.Router();
const passport = require('passport');
// this is for encrypting passwords
const bcrypt = require('bcryptjs');
// User model
const User = require('../models/User');

// Login Page
router.get('/login', (req,res) =>
    res.render("login")
);

// Register Page
router.get('/register', (req,res) =>
    res.render("register")
);

// register handle - handling a post request
router.post('/register', (req, res) => {
    /*
    This will put on the screen hello, and also into the console show your request, which for this
    example would be the email, name, password
    console.log(req.body);
    res.send('hello');
     */
    const {name, email, password, password2 } = req.body;

    let errors = [];

    // check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: "Please fill in all fields"});
    }

    // check passwords match
    if(password !== password2){
        errors.push({msg: "Passwords do not match"});
    }

    // check password is six characters long
    if(password.length < 6){
        errors.push({msg: "Password must be at least 6 characters"});
    }

    if(errors.length > 0){
        // pass in variables and errors
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        //validation pass
        // this returns a promise so you use .then
        User.findOne({email: email})
            .then(user => {
                if(user){
                    // User exists
                    errors.push({msg: "Email already in use"});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                }else{
                    // user doesn't exist, so add a new user
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: password
                    });

                    // Hash Password
                    // generate a salt to create a hash, using genSalt
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err){
                                throw err;
                            }
                            // sets the password to hashed password
                            newUser.password = hash;
                            // saves the user to mongo
                            // returns a promise
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/users/login.ejs');
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/userse/login',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;