module.exports = function(app, user) {
  
    app.get("/api/dashboard", function(req, res) {
        const User = user;
        const id = req.session.passport.user

        User.findByPk(id)
        .then(function (user) {
             const User = user.get();
             res.json(User)
        })
});

}