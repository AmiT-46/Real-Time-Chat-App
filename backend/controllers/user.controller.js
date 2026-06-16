const User = require('../models/user.model');

const getUsersForSidebar = async (req, res) => {
    try {
        // req.user._id comes from our protectRoute middleware
        const loggedInUserId = req.user._id;

        // Find all users where the _id is NOT EQUAL ($ne) to the logged-in user
        // .select("-password") ensures we don't send passwords to the frontend!
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { getUsersForSidebar };