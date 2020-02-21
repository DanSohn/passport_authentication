const express = require('express');
const router = express.Router();

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

});

module.exports = router;