module.exports = function(app, db) {
  
    app.get("/api/home", function(req, res) {
  
        const id = req.session.passport.user

        db.user.findByPk(id)
        .then(function (User) {
             return res.json(User.get())
        })
});

}