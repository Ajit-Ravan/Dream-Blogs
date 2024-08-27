const { Schema, model, SchemaType } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
    },
    coverImageUrl: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true });


const blogModel = model("blog", blogSchema);


module.exports = blogModel;