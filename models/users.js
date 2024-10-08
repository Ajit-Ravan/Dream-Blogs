const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { creatJsonWebToken } = require("../services/authentication");




//creating schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    salt: {
        type: String,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profileImageUrl: {
        type: String,
        default: "/Images/default.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
}, { timestamps: true });

//pre-save
userSchema.pre("save", function (next) {
    const user = this;              //this pointing to current user

    if (!user.isModified("password")) return;
    //secret key for each user
    const salt = randomBytes(16).toString();
    //Hash the password : using built in package crypto  
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;

    next();
});

//virtual function for matching the hex password
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");
    ;
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");
    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect password!");
    const token = creatJsonWebToken(user);

    return token;
})


//creating user model
const User = model('user', userSchema);

module.exports = User;