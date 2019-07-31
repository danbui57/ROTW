module.exports = function(app, user) {
  
    app.get("/api/home", function(req, res) {
  
        const id = req.session.passport.user

        user.findByPk(id)
        .then(function (User) {
             return res.json(User.get())
        })
});

}