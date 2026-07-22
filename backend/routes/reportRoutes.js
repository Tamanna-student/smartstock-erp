const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getSalesReport,
    getRevenueReport,
    getInventoryReport,
    searchProducts,
    searchBills,
} = require("../controllers/reportController");

router.get("/sales", protect, getSalesReport);
router.get("/revenue", protect, getRevenueReport);
router.get("/inventory", protect, getInventoryReport);
router.get("/search/products", protect, searchProducts);
router.get("/search/bills", protect, searchBills);

module.exports = router;