const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Add Employee
const addEmployee = async (req, res) => {

    try {
        if (req.user.role !== "admin") {

    return res.status(403).json({
        success:false,
        message:"Access Denied"
    });

}

        const {
            fullName,
            phone,
            email,
            password,
            address,
        } = req.body;

        if (!fullName || !phone || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

       const existingEmployee = await User.findOne({
    $or: [
        { email },
        { phone }
    ]
});

        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: "Email or phone number already exists",
            });
        }

        // Fetch logged-in admin
        const admin = await User.findById(req.user.id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await User.create({

            fullName,

            businessName: admin.businessName,

            businessType: admin.businessType,

            phone,

            email,

            password: hashedPassword,

            address,

            role: "employee",

            ownerId: admin._id,

        });

        res.status(201).json({
    success: true,
    message: "Employee added successfully",
    employee: {
        id: employee._id,
        fullName: employee.fullName,
        businessName: employee.businessName,
        phone: employee.phone,
        email: employee.email,
        address: employee.address,
        role: employee.role,
    },
});

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};
// Get All Employees
const getEmployees = async (req, res) => {

    try {
        if (req.user.role !== "admin") {

    return res.status(403).json({
        success:false,
        message:"Access Denied"
    });

}

        const employees = await User.find({
            role: "employee",
            ownerId: req.user.id,
        }).select("-password");

        res.status(200).json({
            success: true,
            count: employees.length,
            employees,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

// Update Employee
const updateEmployee = async (req, res) => {

    try {
        if (req.user.role !== "admin") {

    return res.status(403).json({
        success:false,
        message:"Access Denied"
    });

}

        const employee = await User.findOne({
            _id: req.params.id,
            role: "employee",
            ownerId: req.user.id,
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        const {
            fullName,
            phone,
            address,
        } = req.body;

        
        if (phone && phone !== employee.phone) {

    const existingPhone = await User.findOne({
        phone,
        _id: { $ne: employee._id },
    });

    if (existingPhone) {
        return res.status(409).json({
            success: false,
            message: "Phone number already exists",
        });
    }

}
        employee.fullName = fullName || employee.fullName;
        employee.phone = phone || employee.phone;
        employee.address = address || employee.address;



        await employee.save();

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            employee: {
    id: employee._id,
    fullName: employee.fullName,
    businessName: employee.businessName,
    phone: employee.phone,
    email: employee.email,
    address: employee.address,
    role: employee.role,
},
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

// Delete Employee
const deleteEmployee = async (req, res) => {

    try {
        if (req.user.role !== "admin") {

    return res.status(403).json({
        success:false,
        message:"Access Denied"
    });

}

        const employee = await User.findOne({
            _id: req.params.id,
            role: "employee",
            ownerId: req.user.id,
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

module.exports = {
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
};