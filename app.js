const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./node_modules/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, dbName: password_authentication})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Bodyparser - get data from form with request.body
app.use(express.urlencoded({extended: false}));

// EJS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

//ROUTES
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));