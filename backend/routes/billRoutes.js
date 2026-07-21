const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createBill,
    getBills,
    getBillById,
} = require("../controllers/billController");

router.post("/", protect, createBill);
router.get("/", protect, getBills);
router.get("/:id", protect, getBillById);

module.exports = router;