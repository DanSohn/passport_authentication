module.exports = {
    ensureAuthenticated: function(req, res, next) {
        // method from passport module
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/users/login');
    }
};

// this will protect routes from not authenticated users
