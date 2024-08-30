const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const blogModel = require("./models/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlwares/authentication");
const saveCountriesToDB = require('./services/countryData');
const saveStatesToDB = require("./services/stateData");
const saveCitiesToDB = require("./services/cityData");

const app = express();
const PORT = 8000;
//connecting mongoDB
mongoose.connect("mongodb://localhost:27017/dblogs").then(e => console.log("MongoDB connected!"));
//set ejs engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlwares
app.use(express.json());             //parses incoming requests with JSON payloads and makes the parsed data available on req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));      // we have passed token here because we set the token name as token while creating
app.use(express.static(path.resolve("./public")));   //we are telling express that serve public folder statically 


// Function to save data to the database
const saveDataToDB = async () => {
    try {
        await saveCountriesToDB();
        await saveStatesToDB();
        await saveCitiesToDB();
    } catch (error) {
        console.error('Error saving data to the database:', error);
    }
};

// Call the function to save data when the server starts
saveDataToDB();

app.get('/', async (req, res) => {
    const allBlogs = await blogModel.find({});
    res.render("home", {
        user: req.user,               //passing user to home : req.user storing value of token and we are passing that value on homepage
        allBlogs: allBlogs,
    });

});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server started at PORT: `, PORT));