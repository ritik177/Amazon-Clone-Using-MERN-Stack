const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenticate =  async (req, res, next) => {
    try {
        const token = req.cookies.Amazonweb;

        const verifyToken = jwt.verify(token,secretKey);
        console.log(verifyToken);

        const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token});
        console.log(rootUser);

        if(!rootUser) 
        // {return res.status((422).json({error:"User not found"}))}
        {throw new Error("User not found ")};

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();


    } catch (error) {
        console.log(error);
        // res.status(401).send("Unauthorized: No token provided");
        res.status(401).json("Unauthorized: No token provided");

    }
}   

module.exports = authenticate;

