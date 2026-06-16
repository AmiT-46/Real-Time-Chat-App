
const User = require('../models/user.model.js');
const generateTokenAndSetCookie = require('../utils/generateToken.js')
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        // 1. Grab the inputs from the user
        const { fullName, username, password, confirmPassword } = req.body;

        // 2. Validate passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // 3. Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // 4. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Generate a random profile picture based on their username (using a free API)
        const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        // 6. Create the new user object
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            profilePic
        });

        // 7. Save user to database and generate token
        if (newUser) {
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            
            // Save to MongoDB
            await newUser.save();

            // Send success response (excluding the password!)
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const login = async (req, res) => {

    try {
        const { username, password } = req.body;

        // 1. Check if the user exists in the database
        const user = await User.findOne({ username });

        // 2. Check if the password is correct (using bcrypt.compare)
        // We use user?.password to prevent the app from crashing if 'user' is null
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // 3. Generate the token and set it as a cookie
        generateTokenAndSetCookie(user._id, res);

        // 4. Send back the user data (excluding the password)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const logout = async (req, res) => {
    try {
        // Clear the cookie by setting its maxAge to 0
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {
    signup,
    login,
    logout
}