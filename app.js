const express = require("express");
const app = express();
const request = require("request");


app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("landing.ejs");
});


app.get("/univlist", (req, res) => {
    const loc = 'http://universities.hipolabs.com/search?country=';
    const value = req.query.sub;
    if(value.length == 0){
        res.redirect("error");
    }
    else{
    request(`${loc}${value}`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const response = JSON.parse(body);

            if (response.length == 0) {
                res.redirect("error");
            } else {
                res.render("univ.ejs", { child: response , val: value });
            }
        }
    });
    }
});

//----------------------------------------------------
app.get("/error", (req, res) => {
    res.render("error");
});

// ---------------------------------------------------------
app.listen(process.env.PORT || 3000, () => {
    console.log("Server Is Live!!! ");
});