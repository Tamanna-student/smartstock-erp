const User = require("../models/User");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            businessName,
            businessType,
            phone,
            email,
            password,
            address,
            gstNumber,
        } = req.body;

        if (
            !fullName ||
            !businessName ||
            !businessType ||
            !phone ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            businessName,
            businessType,
            phone,
            email,
            password: hashedPassword,
            address,
            gstNumber,
        });

        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: {
                id: user._id,
                fullName: user.fullName,
                businessName: user.businessName,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    registerUser,
};