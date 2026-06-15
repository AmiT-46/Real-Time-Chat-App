const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {
    // 1. Create the token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    // 2. Set it as a cookie
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevents cross-site scripting (XSS) attacks
        sameSite: 'strict', // Prevents cross-site request forgery (CSRF) attacks
        secure: process.env.NODE_ENV !== 'development', // Only use HTTPS in production
    });
};

module.exports = generateTokenAndSetCookie;