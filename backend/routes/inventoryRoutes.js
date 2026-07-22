const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    updateStock,
    getInventory,
    getLowStock
} = require("../controllers/inventoryController");


router.put(
    "/",
     protect, 
     updateStock
    );

router.get(
    "/",
    protect,
    getInventory
);

router.get(
    "/low-stock",
    protect,
    getLowStock
);

module.exports = router;