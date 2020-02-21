const express = require('express');
const router = express.Router();
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
                    console.log(newUser);
                    res.send('hello');
                }
            })
    }
});

module.exports = router;