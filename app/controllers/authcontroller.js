var exports = module.exports = {}
 
exports.signup = function(req, res) {
    res.render('../app/views/signup'); 
}

exports.signin = function (req, res) {
    res.render("../app/views/signin")
}