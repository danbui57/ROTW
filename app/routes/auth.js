const authController = require('../controllers/authcontroller.js');

 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);

    app.get("/signin", authController.signin);

    app.post("/signup", passport.authenticate("local-signup", {
        failureRedirect: "/signin"
    }), 
    function(req, res) {
        const user = req.session.passport.user
        res.redirect("dashboard/?user_id=" + user);
    });


    app.get('/dashboard',isLoggedIn, authController.dashboard);

    app.get("/logout", authController.logout);

    app.post("/signin", passport.authenticate("local-signin", {
        failureRedirect: "/signin"
    }), 
    function(req, res) {
        const user = req.session.passport.user
        res.redirect("dashboard/?user_id=" + user);
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
}  