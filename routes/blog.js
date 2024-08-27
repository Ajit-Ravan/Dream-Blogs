const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const blogModel = require("../models/blog");
const router = Router();


//disk storage for files : The disk storage engine gives you full control on storing files to disk. (Storing in uploads folder)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads"));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {

    res.render("addBlog", {
        user: req.user,
    });
});


router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;
    const userBlog = await blogModel.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageUrl: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${userBlog._id}`);
});







module.exports = router;