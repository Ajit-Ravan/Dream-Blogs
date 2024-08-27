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
    const { firstName, email, password } = req.body;
    await User.create({
        firstName,
        email,
        password,
    });
    return res.redirect("/");
});

router.get("/logout", (req, res) => {
    //for logout we have to just clear cookie and render home page
    res.clearCookie("token").redirect("/");
});

module.exports = router;