const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", function (req, res) {
    res.send("Hello")
})

app.listen(PORT, function (err) {
if (!err) {
    console.log(" Server successfully connected to http://localhost:" + PORT);
}else { 
    console.log("error:", err);
}
})