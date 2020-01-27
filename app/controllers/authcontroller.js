var exports = module.exports = {}
 
exports.signup = (req, res) => {
    res.render('../app/views/signup'); 
}
 
exports.signin = (req, res) => {
    res.render("../app/views/signin")
}

exports.dashboard = (req, res) => {
     res.render("../app/views/dashboard")
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
}

