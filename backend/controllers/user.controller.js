const User = require('../models/user.model');
const bcrypt = require('bcrypt');

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

// --- Update Profile ---
const updateProfile = async (req, res) => {
    try {
        const { fullName, username } = req.body;
        const userId = req.user._id;

        // Find user and update their details, returning the new document without the password
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, username },
            { new: true }
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateProfile: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// --- Delete Profile ---
const deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Delete the user from the database
        await User.findByIdAndDelete(userId);

        // (Optional but recommended): Delete all messages sent by or to this user to clean up the DB
        // await Message.deleteMany({ $or: [{ senderId: userId }, { receiverId: userId }] });

        // 2. Clear the JWT cookie to log them out
        res.cookie("jwt", "", { maxAge: 0 });

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProfile: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // 1. Verify the current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid current password" });

        // 2. Validate new password length
        if (newPassword.length < 6) {
            return res.status(400).json({ error: "New password must be at least 6 characters" });
        }

        // 3. Hash the new password and save
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error in changePassword: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getUsersForSidebar, updateProfile, deleteProfile, changePassword };