const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const blogModel = require("../models/blog");
const Comment = require("../models/comment");
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

//for dynamic route which is based on ._id of user 
router.get('/:id', async (req, res) => {
    const blog = await blogModel.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    res.render("blog", {
        user: req.user,
        blog,
        comments,
    })

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


//for comments 
router.post("/comment/:blogId", async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,

    });
    return res.redirect(`/blog/${req.params.blogId}`);
});




module.exports = router;