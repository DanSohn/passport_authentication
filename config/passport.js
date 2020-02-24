const local_strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load the User Model
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new local_strategy({
            usernameField: 'email' //our user name is our field
        }, (email, password, done) =>{
            // Match user with email in our DB
            User.findOne({email: email})
                .then(user => {
                    if(!user) {
                        // error, user, options for done
                        return done(null, false, {message: 'That email is not registered' });
                    }

                    // there is a match to an existing user
                    // password is plain text, while user is hashed password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, {message: 'Password incorrect' });
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
};
