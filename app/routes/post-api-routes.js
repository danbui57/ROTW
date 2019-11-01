module.exports = function (app, db) {


    app.post("/api/home/:id", function (req, res) {
console.log("POSTING!: ", req.body)
        db.post.create(req.body).then(function (Post) {
            return res.json(Post)
        });
    });

    app.get("/api/post/", function (req,res) {
    //   console.log("POSTING!: ", req)
        var query = {} 
        // if( req.query.user_id) {
        //     query.userId = req.query.user_id;
        //     console.log("POSTING!: ", query.userId)
        // }
        db.post.findAll({
            where: query,
            include: [db.user]
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });
    
    app.get("/api/post/:id", function (req,res) {
        
           const id = req.params.id

            db.vote.findAll({
                where: {
                    voterId: id,
                },
                include: [db.post]
            }).then(function(dbVote) {
                res.json(dbVote);
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

    app.post("/api/post/:id", function (req, res) {
        console.log(req.body)
        db.vote.create(req.body).then(function(Vote) {
            return res.json(Vote)
        })
        
    })

    app.delete("/api/vote/:id", function (req, res) {
console.log(req.params)
        db.vote.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbVote) {
            res.json(dbVote)
            console.log("DELETE VOTE.ID: ", req.params.id)
        })
    })

    app.get("/api/vote/:id", function(req, res) {

  db.vote.findAndCountAll({
     where: {
        postId: req.params.id
        
     }

  })
  .then(result => {
      res.json(result.count);
    console.log("COUNT: ",result.count);
    // console.log("ROWS: ",result.rows);
  });

    });
}