const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protectRoute = async (req, res, next) => {
    try {
        //Check if the token exists
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        //Verify the token is valid and hasn't been tampered with
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // Find the user in the database (excluding their password for security)
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach the user to the request object and move to the next function
        req.user = user;
        next(); 

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = protectRoute;