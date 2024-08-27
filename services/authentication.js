const JWT = require("jsonwebtoken");

const secretKey = "B@tMan";

function creatJsonWebToken(user) {
    const payload = {
        _id: user.id,
        firstName: user.firstName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,



    };
    const token = JWT.sign(payload, secretKey);
    return token;
}


function validateToken(token) {
    const payload = JWT.verify(token, secretKey);
    return payload;
}


module.exports = {
    creatJsonWebToken,
    validateToken,
};