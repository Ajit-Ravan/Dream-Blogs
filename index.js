const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlwares/authentication");

const app = express();
const PORT = 8000;
//connecting mongoDB
mongoose.connect("mongodb://localhost:27017/dblogs").then(e => console.log("MongoDB connected!"));
//set ejs engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlwares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));      // we have passed token here because we set the token name as token while creating

app.get('/', (req, res) => {
    res.render("home", {
        user: req.user,               //passing user to home : req.user storing value of token and we are passing that value on homepage
    });

});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at PORT: `, PORT));