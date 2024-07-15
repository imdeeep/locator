const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Sign up
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password,
        });

        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Saving the user in the database
        await user.save();

        // Return Jwt
        const payload = {
            user: {
                id: user.id,
                name: user.name,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: false,
                secure: process.env.SECURITY === 'true', // Set to true in production
                sameSite: 'None', // Ensure this is set for cross-site cookies
              });
            res.json({ token });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Return JWT
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: false,
                secure: process.env.SECURITY === 'true', // Set to true in production
                sameSite: 'None', // Ensure this is set for cross-site cookies
              });
            res.json({ msg: 'Login successful', token });
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get User Info
exports.getCurrentUser = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
