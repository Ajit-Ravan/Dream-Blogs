const { Router } = require("express");
const User = require("../models/users");
const router = Router();

router.get("/signin", (req, res) => {
    res.render("signin");
});


router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.matchPassword(email, password);
    console.log(user);
});

router.post("/signup", async (req, res) => {
    const { firstName, email, password } = req.body;
    await User.create({
        firstName,
        email,
        password,
    });
    return res.redirect("/");
});

module.exports = router;