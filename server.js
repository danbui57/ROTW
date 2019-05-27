const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
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
    res.send("Welcome to ROTW")
});

//Models
const models = require("./app/models");

//Sync Database
models.sequelize.sync().then(function () {
    console.log("Nice! Database looks fine")
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
})

app.listen(PORT,(err) => {
if (!err) {
    console.log(`Server successfully connected to http://localhost: ${PORT}`);
}else { 
    console.log("error:", err);
}
})