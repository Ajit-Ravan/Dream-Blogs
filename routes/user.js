const { Router } = require("express");
const User = require("../models/users");
const router = Router();
const Country = require("../models/country");
const State = require("../models/state");
const City = require("../models/city");
const dependencyLocation = require("../controllers/dependencyLocation");

router.get("/signin", (req, res) => {
    res.render("signin");
});

//get countries data 
router.get('/get-countries', dependencyLocation.getCountries);
//get states data
router.get('/get-states', dependencyLocation.getStates);
//get city data
router.get('/get-cities/:stateCode', dependencyLocation.getCities);


router.get("/signup", async (req, res) => {
    try {
        const countries = await Country.find({});
        const selectedCountry = req.query.country;  // Get selected country from the query params
        const selectedState = req.query.state; // Get selected state from the query params

        let states = [];
        let cities = [];

        if (selectedCountry) {
            states = await State.find({ countryId: selectedCountry });
        }

        if (selectedState) {
            cities = await City.find({ stateId: selectedState });
        }
        res.render("signup", {
            countries,
            states,
            cities,
            selectedCountry,
            selectedState
        });
    } catch (error) {
        console.log('Error fetching data:', error);
        res.status(500).send("Internal Server Error.");
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        console.log(token);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password",
        });
    }
});

router.post("/signup", async (req, res) => {
    const { firstName, email, password, country, state, city } = req.body;
    console.log("Form Data:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
    await User.create({
        firstName,
        email,
        password,
        country,
        state,
        city,
    });
    return res.redirect("/");
});

router.get("/logout", (req, res) => {
    //for logout we have to just clear cookie and render home page
    res.clearCookie("token").redirect("/");
});

module.exports = router;