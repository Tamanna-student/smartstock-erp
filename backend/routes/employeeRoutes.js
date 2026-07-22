const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
} = require("../controllers/employeeController");

router.post("/", protect, adminOnly, addEmployee);
router.get("/", protect, adminOnly, getEmployees);
router.put("/:id", protect, adminOnly, updateEmployee);
router.delete("/:id", protect, adminOnly, deleteEmployee);
module.exports = router;