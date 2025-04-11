const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const validator = require('email-validator');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    if (!validator.validate(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
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
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    if (!validator.validate(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        if (user) {
            return res.status(200).json({
                _id: user._id,
                message: 'User logged in successfully',
                token,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getUserInfo };
