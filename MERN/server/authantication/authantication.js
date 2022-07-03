const jwt = require("jsonwebtoken");
const User = require("../model/model");

const authantication = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        const varifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: varifyToken._id, "tokens.token": token });

        if (!rootUser) { throw new Error("User not found") }
        req.token = token;
        req.rootUser = rootUser;
        req._id = rootUser._id;

        next(); 
    } catch (err) {
        res.status(401).send("Unauthorized user");
    }
}

module.exports = authantication;