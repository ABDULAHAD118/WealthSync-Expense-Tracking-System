const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id)
            .select('-password')
            .select('-__v')
            .select('-createdAt')
            .select('-updatedAt');
        res.status(200).json({ message: 'Token is valid', user });
    } catch (error) {
        return res.status(401).json({ message: 'User is not Authorized' });
    }
};

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
module.exports = { authMiddleware, verifyToken };
