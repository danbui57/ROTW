// const db = require("../models")

// module.exports = function(app) {
    
//     app.get("/api/posts", function(req, res) {
//         const query = {};
//         db.Post.findAll({
//             where: query,
//             include: [db.User]
//         }).then(function(dbPost) {
//             res.json(dbPost);
//         })
//     })
//     // app.get("/api/posts", function(req, res) {
//     //     const query = {};
//     //     if (req.query.user_id) {
//     //         query.UserId = req.query.user_id;
//     //     }

//     //     db.Post.FindAll({
//     //         where: query,
//     //         include: [db.User]
//     //     }).then(function(dbPost) {
//     //         console.log("AAYYYEEEEE" + res.json(dbPost));
//     //     });
//     // });

//     app.post("/api/posts", function(req, res) {
//         // db.Post = {body: "This really just worked!"}
//         console.log("MODELS POST", db.Post)
//         db.Post.create(req.body).then(function(dbPost) {
//             res.json(dbPost)
//         })
//     })
// }