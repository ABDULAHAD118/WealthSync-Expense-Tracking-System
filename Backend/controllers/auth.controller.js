const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({
            email,
            password,
            fullName,
            profileImageUrl,
        });
        const token = generateToken(user._id);
        if (user) {
            return res.status(201).json({
                _id: user._id,
                message: 'User created successfully',
                token,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
};
const getUserInfo = async (req, res) => {};

module.exports = { registerUser, loginUser, getUserInfo };
