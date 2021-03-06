const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path")
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;


app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(cookieParser());

// For Passport 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Route to homepage
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "/app/views/index.html"))
}); 

//Models
const models = require("./app/models");

//Routes
require("./app/routes/post-api-routes")(app, models);
require("./app/routes/user-api-routes")(app, models);

const authRoute = require("./app/routes/auth")(app, passport);

//load passport strategies
require("./app/config/passport/passport")(passport, models.user)

//Sync Database
models.sequelize.sync().then(function () {
    console.log("Nice! Database looks fine")
}).catch(function (err) {
    console.log("ERROR!", err, "Something went wrong with the Database Update!")
})

app.listen(PORT,(err) => {
if (!err) {
    console.log(`Server successfully connected to http://localhost:${PORT}`);
}else { 
    console.log("error:", err);
}
})