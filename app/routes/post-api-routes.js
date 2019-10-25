module.exports = function (app, db) {


    app.post("/api/home/:id", function (req, res) {
// console.log("POSTING!: ", db.post)
        db.post.create(req.body).then(function (Post) {
            return res.json(Post)
        });
    });

    app.get("/api/post/", function (req,res) {
    //   console.log("POSTING!: ", req)
        var query = {}
        if( req.query.user_id) {
            query.userId = req.query.user_id;
            // console.log("POSTING!: ", query.userId)
        }
        console.log("POSTING!: ",query)
        db.post.findAll({
            where: query,
            include: [db.user]
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.delete("/api/post/:id", function (req, res) {
        db.post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbPost) {
            res.json(dbPost)
            console.log("DELETE POST: ", req.params.id)
        })
    })
}