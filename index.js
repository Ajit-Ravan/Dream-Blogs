const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const userRoute = require("./routes/user");


const PORT = 8000;
//connecting mongoDB
mongoose.connect("mongodb://localhost:27017/dblogs").then(e => console.log("MongoDB connected!"));
//set ejs engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlware 
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at PORT: `, PORT));