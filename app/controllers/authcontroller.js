var exports = module.exports = {}
 
exports.signup = function(req, res) {
    res.render('../app/views/signup'); 
}

exports.signin = function (req, res) {
    res.render("../app/views/signin")
}

exports.dashboard = function (req, res) {
    res.render("../app/views/dashboard")
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/");
    });
}