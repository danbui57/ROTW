module.exports = function (app, post) {


    app.post("/api/home/:id", function (req, res) {

        post.create(req.body).then(function (Post) {
            return res.json(Post)
        });
    });
}