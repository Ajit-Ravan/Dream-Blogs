const { Schema, model } = require("mongoose");

//comment schema
const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        blogId: {
            type: Schema.Types.ObjectId,
            ref: "blog",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },

    }, { timestamps: true });

//model 
const Comment = model("comment", commentSchema);

module.exports = Comment;